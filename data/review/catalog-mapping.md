# 市场目录安装映射 / Catalog install mappings

由 `node scripts/catalog-mappings.mjs --min-stars 5 --apply --write-report` 生成于 2026-11-22。

范围：schema 3 市场目录中尚无安装映射、且 ≥ 该星级门槛的仓库（`data/catalog-mapping-skips.json` 已裁决过的除外）。自动补充只接受「命令逐字来自 README」或「manifest 证明是本仓库插件」的条目：npm 包的 registry `repository` 必须指向本仓库；README 没有可复制命令时，以根 `package.json` / `cordis.patch.yml` 的 dsh 声明作为证据（npm 包存在则用包名，否则用仓库地址）。其余进入下方待裁决清单，供每日 AI 审核补齐。

- 本次扫描 / scanned: **13**
- 自动补充 / auto-applied: **11**（manifest 证据 10）
- 待裁决 / needs review: **2**

## 自动补充 / Auto-applied（11）

| 仓库 / Repo | ★ | 安装目标 / Targets | 证据 / Evidence |
| --- | ---: | --- | --- |
| [mochi-fish/dsh-fish](https://github.com/mochi-fish/dsh-fish) | 176 | `npm:@ssamurias/dsh-fish` | manifest@package.json (npm repository match) |
| [JimLiu/open-artifact](https://github.com/JimLiu/open-artifact) | 131 | `npm:dsh-open-artifact` | README |
| [thePlannerIvan/planners-form](https://github.com/thePlannerIvan/planners-form) | 27 | `github:theplannerivan/planners-form` | manifest@package.json#dsh |
| [fengshiyangrouguan/dsh-closure-pet](https://github.com/fengshiyangrouguan/dsh-closure-pet) | 20 | `github:fengshiyangrouguan/dsh-closure-pet` | manifest@package.json#dsh |
| [holosama212/dsh-rinko-nai](https://github.com/holosama212/dsh-rinko-nai) | 6 | `npm:dsh-rinko-nai` | manifest@package.json (npm repository match) |
| [jinchezuo/dsh-interpret](https://github.com/jinchezuo/dsh-interpret) | 6 | `github:jinchezuo/dsh-interpret` | manifest@package.json#dsh |
| [XLNC-L/dsh-connect-madao](https://github.com/XLNC-L/dsh-connect-madao) | 6 | `npm:dsh-connect-madao` | manifest@package.json (npm repository match) |
| [AIcivilization/dsh-her](https://github.com/AIcivilization/dsh-her) | 5 | `npm:dsh-her` | manifest@package.json (npm repository match) |
| [gaoqiaoliangjie666/dsh-qwen-connect](https://github.com/gaoqiaoliangjie666/dsh-qwen-connect) | 5 | `github:gaoqiaoliangjie666/dsh-qwen-connect` | manifest@package.json#dsh |
| [nerv-base/dsh-theme-eva](https://github.com/nerv-base/dsh-theme-eva) | 5 | `npm:dsh-theme-eva` | manifest@package.json (npm repository match) |
| [rinDBeans/dsh-nocturne](https://github.com/rinDBeans/dsh-nocturne) | 5 | `github:rindbeans/dsh-nocturne` | manifest@package.json#dsh |

## 待裁决 / Needs review（2）

| 仓库 / Repo | ★ | 原因 / Why not automatic | README 提示 / Hint |
| --- | ---: | --- | --- |
| [kaust-ark/ARK](https://github.com/kaust-ark/ARK) | 38 | no install command extracted; no package.json |  |
| [BB-84C/deepseek-harness-mobile-solution](https://github.com/BB-84C/deepseek-harness-mobile-solution) | 5 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile mobile add @bb-84c/dsh-mobile-cli |

