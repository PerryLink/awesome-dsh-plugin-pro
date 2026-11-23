import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, cp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function makeFixture(t, { packages, curated, repositories, approved }) {
  const root = await mkdtemp(resolve(tmpdir(), 'validate-packages-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(resolve(root, 'scripts'));
  await mkdir(resolve(root, 'data'));
  for (const name of ['validate-packages.mjs', 'readme-install.mjs']) {
    await cp(resolve(repo, 'scripts', name), resolve(root, 'scripts', name));
  }
  await writeFile(resolve(root, 'data/packages.json'), JSON.stringify({ schema_version: 1, entries: packages }));
  await writeFile(resolve(root, 'data/curated.json'), JSON.stringify(curated));
  await writeFile(resolve(root, 'data/repositories.json'), JSON.stringify({ repositories }));
  await writeFile(resolve(root, 'data/approved.json'), JSON.stringify(approved));
  return root;
}

function runValidator(root, args = []) {
  return spawnSync(process.execPath, ['./scripts/validate-packages.mjs', ...args], {
    cwd: root,
    encoding: 'utf8',
  });
}

const cmdEntry = (slug) => ({
  status: 'readme-verified',
  verified_date: '2026-11-21',
  verified_via: 'README',
  packages: [{
    profile: 'web',
    source: `github:${slug}`,
    install: `https://github.com/${slug}`,
    command: `dsh plugin --profile web add github:${slug}`,
  }],
});

const manualEntry = () => ({
  status: 'readme-verified',
  verified_date: '2026-11-21',
  verified_via: 'README',
  install_mode: 'manual',
  manual_instructions: 'Install manually from source.',
  packages: [],
});

test('snapshot-absent approved entries warn by default (daily review window) and fail under --strict-snapshot', async (t) => {
  const root = await makeFixture(t, {
    packages: {
      'alice/live-plugin': cmdEntry('alice/live-plugin'),
      'bob/deleted-today': cmdEntry('bob/deleted-today'),
      'carol/manual-deleted-today': manualEntry(),
    },
    curated: { excluded_repos: {}, market_exclusions: {} },
    repositories: [{ full_name: 'alice/live-plugin' }],
    approved: {
      'alice/live-plugin': '2026-11-01',
      'bob/deleted-today': '2026-11-01',
      'carol/manual-deleted-today': '2026-11-01',
    },
  });

  const relaxed = runValidator(root);
  assert.equal(relaxed.status, 0, relaxed.stderr);
  assert.match(relaxed.stderr, /bob\/deleted-today: not in the current snapshot \(still in approved\.json/);
  assert.match(relaxed.stderr, /carol\/manual-deleted-today: not in the current snapshot \(still in approved\.json/);

  const strict = runValidator(root, ['--strict-snapshot']);
  assert.notEqual(strict.status, 0);
  assert.match(strict.stderr, /bob\/deleted-today: not in the current snapshot/);
  assert.match(strict.stderr, /carol\/manual-deleted-today: not in the current snapshot/);
});

test('unapproved snapshot-absent entries and excluded manual entries always hard-fail', async (t) => {
  const root = await makeFixture(t, {
    packages: {
      'alice/typo-cmd': cmdEntry('alice/typo-cmd'),
      'bob/orphan-manual': manualEntry(),
      'carol/excluded-manual': manualEntry(),
    },
    curated: {
      excluded_repos: { 'carol/excluded-manual': 'Not a plugin' },
      market_exclusions: {},
    },
    repositories: [{ full_name: 'carol/excluded-manual' }],
    approved: {},
  });

  const res = runValidator(root);
  assert.notEqual(res.status, 0);
  assert.match(res.stderr, /alice\/typo-cmd: not in the current snapshot/);
  assert.match(res.stderr, /bob\/orphan-manual: not in the current snapshot/);
  assert.match(res.stderr, /carol\/excluded-manual: excluded_repos entry must not carry a packages mapping/);
});
