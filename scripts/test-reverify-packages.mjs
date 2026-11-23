import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBPAGE_READMES, verifyReadmeText } from './reverify-packages.mjs';

test('manual entries skip verification with no problems or notes', () => {
  const result = verifyReadmeText(
    'owner/manual-repo',
    { install_mode: 'manual', manual_instructions: 'Clone and link locally.' },
    'No install command anywhere.',
  );
  assert.deepEqual(result, { problems: [], notes: [] });
});

test('backslash-continued fenced commands re-verify cleanly under bare github and release URL policies', () => {
  const ghResult = verifyReadmeText(
    'shuaweng/dsh_xieshujing',
    {
      packages: [{
        profile: 'web',
        install: 'https://github.com/shuaweng/DSH_xieshujing',
        source: 'github:shuaweng/DSH_xieshujing',
        command: 'dsh plugin --profile web add github:shuaweng/DSH_xieshujing',
      }],
    },
    '```bash\ndsh plugin --profile web add \\\n  github:shuaweng/DSH_xieshujing#v0.1.3-alpha.1\n```',
  );
  assert.deepEqual(ghResult.problems, []);

  const urlResult = verifyReadmeText(
    'fatmo666/caushell',
    {
      packages: [{
        profile: 'web',
        install: 'https://github.com/fatmo666/Caushell/releases/latest/download/caushell-dsh-bash.tgz',
        source: 'url:https://github.com/fatmo666/Caushell/releases/latest/download/caushell-dsh-bash.tgz',
        command: 'dsh plugin --profile web add https://github.com/fatmo666/Caushell/releases/latest/download/caushell-dsh-bash.tgz',
      }],
    },
    '```sh\ndsh plugin --profile web add \\\n  https://github.com/fatmo666/Caushell/releases/latest/download/caushell-dsh-bash.tgz\n```',
  );
  assert.deepEqual(urlResult.problems, []);
});

test('bare self-repo github target matches self-repo release tarballs and still flags real removals', () => {
  const record = {
    status: 'readme-verified',
    packages: [{
      profile: 'web',
      install: 'https://github.com/pearjelly/dsh-heros',
      source: 'github:pearjelly/dsh-heros',
      command: 'dsh plugin --profile web add github:pearjelly/dsh-heros',
    }],
  };

  const withCommandRelease = verifyReadmeText(
    'pearjelly/dsh-heros',
    record,
    '```bash\ndsh plugin --profile web add -w https://github.com/pearjelly/dsh-heros/releases/download/v0.210.0/dsh-heros-bundle.tgz\n```',
  );
  assert.deepEqual(withCommandRelease.problems, []);

  const withPasteRelease = verifyReadmeText(
    'pearjelly/dsh-heros',
    record,
    'Paste into Add plugin:\n```\nhttps://github.com/PearJelly/dsh-heros/releases/download/v5.3.3/bundle.tgz\n```',
  );
  assert.deepEqual(withPasteRelease.problems, []);

  // A release tarball from a DIFFERENT repository must NOT satisfy self-repo equivalence.
  const otherRepoRelease = verifyReadmeText(
    'pearjelly/dsh-heros',
    record,
    '```bash\ndsh plugin --profile web add https://github.com/someone-else/other-plugin/releases/download/v1.0.0/other.tgz\n```',
  );
  assert.equal(otherRepoRelease.problems.length, 1);

  // Removing the release URL completely must still fire drift.
  const removed = verifyReadmeText('pearjelly/dsh-heros', record, '# Archived\nNo longer installable.');
  assert.equal(removed.problems.length, 1);
});

test('SUBPAGE_READMES configures valid relative markdown paths for known monorepo docs', () => {
  for (const [slug, paths] of Object.entries(SUBPAGE_READMES)) {
    assert.match(slug, /^[a-z0-9._-]+\/[a-z0-9._-]+$/);
    assert.ok(Array.isArray(paths) && paths.length > 0);
    for (const p of paths) {
      assert.ok(!p.startsWith('/') && !p.includes('..') && p.endsWith('.md'), p);
    }
  }
});
