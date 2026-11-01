# Pi × IDE — Saifymatteo fork

**English** | [简体中文](README.zh-CN.md)

This is [@saifymatteo/pi-x-ide](https://github.com/saifymatteo/pi-x-ide), a fork of [@balaenis/pi-x-ide](https://github.com/balaenis/pi-x-ide).

For the original project overview, supported IDEs, installation instructions, and general documentation, see the [upstream README](https://github.com/balaenis/pi-x-ide#readme).

## Changes in this fork

When IDE context is attached to a prompt, Pi displays it as a separate purple **IDE Context** message. The message contains the IDE name, file path, and—when available—the selected line range. It does not include selected source contents, so the agent can inspect the file itself when it needs more context. Your prompt remains unchanged.

For example:

```text
### IDE Context
- **IDE**: vscode
- **File**: `src/main.ts`
- **Selection**: L10-L20
```

When no text is selected, the selection line is omitted. For open-file-only context, the message includes the file metadata without attaching its contents.

## Documentation

- [Get started](docs/tutorials/get-started.md)
- [Configuration](docs/reference/configuration.md)
- [Architecture](docs/explanation/architecture.md)

See [CONTRIBUTING.md](CONTRIBUTING.md) for development instructions.

## License

This fork retains the upstream [Apache-2.0 license](LICENSE).
