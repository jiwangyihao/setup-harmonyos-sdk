> [!IMPORTANT]
> **推荐一下本人的实践课作品：基于 ArkUI-X 的跨平台游戏化叙事驱动番茄钟应用[逐火 FlameChase](https://github.com/jiwangyihao/FlameChase)。**
>
> 其中包含使用本工作流的[完整构建示例](https://github.com/jiwangyihao/FlameChase/blob/master/.github/workflows/ci.yml)，可供参考。

# HarmonyOS GitHub Action setup

## Usage

This action requires java 17 or above as sdkmgr from HarmonyOS SDK requires java 17 or above.

After testing, you can create version tag(s) that developers can use to
reference different stable versions of your action. For more information, see
[Versioning](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
in the GitHub Actions toolkit.

To include the action in a workflow in another repository, you can use the
`uses` syntax with the `@` symbol to reference a specific branch, tag, or commit
hash.

```yamljobs:
  build:
    runs-on: macos-latest

    steps:
      - uses: actions/checkout@v2

      - uses: actions/setup-java@v4
        with:
          distribution: 'zulu' # See 'Supported distributions' for available options
          java-version: '17'

      - name: Setup HarmonyOS SDK
        uses: jiwangyihao/setup-harmonyos-sdk@v2.1.4

      - name: Build
        run: |
          ohpm install --all
          ace build hap
          ace build bundle
          ace build apk
          hvigorw --mode project -p product=default assembleApp --analyze=normal --parallel --incremental --daemon
```
