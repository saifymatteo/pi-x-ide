# 在 Zed 中使用 Pi × IDE

Zed 无需扩展。无论在 Zed 终端还是其他任何终端中运行，Pi 都会自动检测 Zed，并读取 Zed 本地状态数据库来追踪活跃文件和选区。

## 前置条件

- 已安装 [`pi`](https://github.com/earendil-works/pi-coding-agent) CLI。
- 已安装 Pi 包：`pi install npm:pi-x-ide`。
- 已安装 Zed。

## 连接

1. 在 Zed 中打开项目文件夹。
2. 在 Zed 中打开终端（`Zed -> Terminal -> New Terminal`）并启动 Pi：

   ```bash
   pi
   ```

Pi 检测到 Zed 环境（`ZED_TERM=true` 或 `TERM_PROGRAM=zed`）后开始轮询 Zed 的 SQLite 数据库。

也可以在其他任意终端中启动 Pi。当没有匹配的 VS Code 或 JetBrains lock file 时，如果 Zed 正在运行且某个打开的窗口包含 Pi 的工作目录，Pi 会连接 Zed。Pi 只读取 Zed 当前会话中的窗口，已关闭的项目会被忽略。Zed 退出后 Pi 断开连接；运行 `/ide` 可重新连接。

在 Linux 上，Pi 通过 Zed 的 `zed-stable.sock` 检查 Zed 是否在运行。在 macOS、Windows 和 WSL 上仅依赖当前会话检查。Pi 输入框上方出现 widget，显示活跃文件和选区。

## 验证是否正常

在 Zed 中打开文件并选中文本，widget 应实时更新：

```
⧉ ⇡ foo.ts#L10-L20
```

聚焦 Pi TUI 并按 `Ctrl+Alt+K`（macOS：`Ctrl+Option+K`），把选区作为 `@src/foo.ts#L10-L20` 插入，然后提交消息。

## 追踪原理

Zed 没有扩展 API，Pi 直接从本地 SQLite 数据库读取编辑器状态。轮询默认每 1000 ms 一次，数据库 WAL 文件未变化时跳过本次。详见 [架构](../explanation/architecture.md#zed-轮询)。

## 配置

| 环境变量                        | 默认值       | 说明                                     |
| ------------------------------- | ------------ | ---------------------------------------- |
| `PI_X_IDE_ZED_DB`               | （自动检测） | 覆盖 Zed SQLite 数据库路径。             |
| `PI_X_IDE_ZED_POLL_INTERVAL_MS` | `1000`       | 轮询间隔（毫秒），限制在 100–2000 范围。 |

默认数据库路径：

- **Linux：** `~/.local/share/zed/db/0-stable/db.sqlite`
- **macOS：** `~/Library/Application Support/Zed/db/0-stable/db.sqlite`
- **Windows：** `%LOCALAPPDATA%\Zed\db\0-stable\db.sqlite`
- **WSL + Windows 版 Zed：** `/mnt/c/Users/<user>/AppData/Local/Zed/db/0-stable/db.sqlite`

这些变量可设为真实环境变量或写入 `~/.pi/pi-x-ide/config.json` 的 `env`。见 [配置](../reference/configuration.md)。

## 注意

- Zed 基于 **轮询**，widget 最多每个轮询间隔更新一次，而非每次按键。
- IDE 侧附加快捷键（VS Code/JetBrains 中的 `Ctrl+Alt+K`）在 Zed 中不可用 - 请用 Pi TUI 快捷键。
- 诊断 Quick Fix 和自动安装是 VS Code 系列功能，Zed 不支持。见 [功能对比](../reference/feature-parity.md)。
