# Pi × IDE — Saifymatteo 分支

[English](README.md) | **简体中文**

这是 [@saifymatteo/pi-x-ide](https://github.com/saifymatteo/pi-x-ide)，基于 [@balaenis/pi-x-ide](https://github.com/balaenis/pi-x-ide) 的分支。

有关上游项目的介绍、支持的 IDE、安装说明和通用文档，请参阅[上游 README](https://github.com/balaenis/pi-x-ide#readme)。

## 此分支的更改

将 IDE 上下文附加到提示时，Pi 会将其显示为单独的紫色 **IDE Context** 消息。消息包含 IDE 名称、文件路径，以及（如果有）所选行范围。消息不会包含选中的源代码，因此代理可以在需要更多上下文时自行读取文件。用户提示保持不变。

例如：

```text
### IDE Context
- **IDE**: vscode
- **File**: `src/main.ts`
- **Selection**: L10-L20
```

未选择文本时会省略选区行。仅附加当前打开文件时，消息包含文件元数据，不会附加文件内容。

## 文档

- [入门指南](docs/zh-CN/tutorials/get-started.md)
- [配置](docs/zh-CN/reference/configuration.md)
- [架构](docs/zh-CN/explanation/architecture.md)

开发说明请参阅 [CONTRIBUTING.zh-CN.md](CONTRIBUTING.zh-CN.md)。

## 许可证

此分支沿用上游的 [Apache-2.0 许可证](LICENSE)。
