# lucky-ts

[![NPM Version](https://img.shields.io/npm/v/lucky-ts.svg)](https://www.npmjs.com/package/lucky-ts)
[![License](https://img.shields.io/npm/l/lucky-ts.svg)](https://github.com/LuckyCurve/lucky-ts/blob/main/LICENSE)

`lucky-ts` 是一个功能强大的命令行工具，旨在简化您的日常开发工作流程。它提供了 SSH 连接管理和腾讯云轻量应用服务器（Lighthouse）的便捷操作。

## 功能特性

- **SSH 连接管理**: 保存常用的 SSH 连接信息，并使用别名一键登录。
- **腾讯云 Lighthouse 管理**: 查询套餐价格、重启实例等。

## 安装

通过 npm 全局安装 `lucky-ts`：

```bash
npm install -g lucky-ts
```

## 使用说明

### SSH 连接管理

您可以使用 `lucky-ts` 来管理您的 SSH 连接。

`lucky-ts config ssh` 命令用于管理 SSH 连接配置。

**1. 添加一个新的 SSH 连接**

```bash
lucky-ts config ssh add <alias> <connectionString>
```

- `<alias>`: 您为连接设置的别名 (例如, `my-server`)。
- `<connectionString>`: SSH 连接字符串 (例如, `user@your-server.com`)。

**示例:**

```bash
lucky-ts config ssh add my-server user@192.168.1.1
```

**2. 列出所有已保存的 SSH 连接**

```bash
lucky-ts config ssh ls
```

**3. 使用别名进行 SSH 连接**

```bash
lucky-ts ssh <alias>
```

**示例:**

```bash
lucky-ts ssh my-server
```

**4. 删除一个已保存的 SSH 连接**

```bash
lucky-ts config ssh rm <alias>
```

**示例:**

```bash
lucky-ts config ssh rm my-server
```

### 腾讯云轻量应用服务器 (Lighthouse) 管理

管理您的腾讯云 Lighthouse 实例。

`lucky-ts config instance` 命令用于管理 Lighthouse 实例配置。

**1. 查询实例套餐价格**

```bash
lucky-ts lh-price
```

此命令将显示不同地域的 Lighthouse 实例套餐价格。

**2. 添加一个新的实例配置**

为了管理实例，您首先需要添加实例的配置信息。

```bash
lucky-ts config instance add <name> <region> <instanceId>
```

- `<name>`: 您为实例设置的别名。
- `<region>`: 实例所在的地域 (例如, `ap-hongkong`)。
- `<instanceId>`: 您的实例 ID。

**3. 列出所有已保存的实例配置**

```bash
lucky-ts config instance ls
```

**4. 重启实例**

```bash
lucky-ts reboot <target>
```

- `<target>`: 您要重启的实例别名。

**示例:**

```bash
lucky-ts reboot my-instance
```

**5. 删除一个实例配置**

```bash
lucky-ts config instance rm <name>
```

## 贡献

我们欢迎任何形式的贡献！如果您有兴趣为 `lucky-ts` 做出贡献，请参阅我们的 [贡献指南](CONTRIBUTING.md)。

## 许可证

本项目基于 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。
