# GEMINI 项目背景

## 项目概述

本项目是一个名为 `lucky-ts` 的命令行界面（CLI）工具，使用 TypeScript 和 Node.js 构建。它利用 `commander` 库解析命令行参数，并提供一个简单的 `ssh` 命令来连接到远程服务器。该项目配置了 ESLint 和 Prettier，以确保代码质量和一致的格式。

### 关键技术

- **语言:** TypeScript
- **运行时:** Node.js
- **框架:** commander.js
- **构建工具:** `tsc` (TypeScript 编译器)
- **包管理器:** yarn
- **代码检查:** ESLint
- **代码格式化:** Prettier

### 架构

该项目遵循一个简单的结构：

- `src/main.ts`: CLI 应用程序的主入口点。它定义了命令及其操作。
- `src/service/ssh.ts`: 包含 `ssh` 命令的核心逻辑，使用 `child_process` 模块生成一个 SSH 客户端。
- `dist/`: 编译后的 JavaScript 代码的输出目录。

## 构建和运行

### 环境要求

- Node.js
- yarn

### 安装

```bash
yarn install
```

### 开发

在开发模式下运行应用程序：

```bash
yarn dev
```

### 构建

为生产环境构建项目：

```bash
yarn build
```

这将把 TypeScript 文件编译成 JavaScript，并将其输出到 `dist` 目录。

## 开发约定

### 编码风格

- 项目使用 Prettier 进行自动代码格式化。配置在 `.prettierrc` 文件中定义。
- 项目使用 ESLint 进行静态代码分析。配置在 `eslint.config.js` 文件中定义。

### 代码检查和格式化

- 检查代码并自动修复问题：

```bash
yarn lint
```

- 格式化代码：

```bash
yarn format
```

### 提交代码

在提交代码之前，建议运行代码检查和格式化程序以确保代码质量。

### 发布

将包发布到 npm：

```bash
npm publish --registry https://registry.npmjs.org
```