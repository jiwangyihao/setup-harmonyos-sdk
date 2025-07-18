> [!IMPORTANT]
> **推荐一下本人的实践课作品：基于 ArkUI-X 的跨平台游戏化叙事驱动番茄钟应用[逐火 FlameChase](https://github.com/jiwangyihao/FlameChase)。**
>
> 其中包含使用本工作流的[完整构建示例](https://github.com/jiwangyihao/FlameChase/blob/master/.github/workflows/ci.yml)，可供参考。

# HarmonyOS GitHub Action setup

[![GitHub Super-Linter](https://github.com/actions/javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/javascript-action/actions/workflows/ci.yml/badge.svg)

## Usage

This action requires java 17 or above as sdkmgr from HarmonyOS SDK requires java 17 or above.

After testing, you can create version tag(s) that developers can use to
reference different stable versions of your action. For more information, see
[Versioning](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
in the GitHub Actions toolkit.

To include the action in a workflow in another repository, you can use the
`uses` syntax with the `@` symbol to reference a specific branch, tag, or commit
hash.

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Run my Action
    id: run-action
    uses: harmonyos-dev/setup-harmonyos-sdk@0.2.0
    # with:
    #   version: '2.0.0.2' # 可选，不填默认是最新版本 2.0.0.2
```
