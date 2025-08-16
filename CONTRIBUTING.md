# 贡献指南 (Contributing Guide)

我们非常欢迎并感谢任何形式的贡献！无论是报告 bug、提出新功能建议，还是提交代码修复和改进，您的参与都对我们非常重要。

## 开发设置

如果您希望为 `lucky-ts` 贡献代码，请按照以下步骤设置开发环境：

1.  **克隆仓库**
    ```bash
    git clone https://github.com/LuckyCurve/lucky-ts.git
    ```
2.  **安装依赖**
    ```bash
    cd lucky-ts
    yarn install
    ```
3.  **运行开发模式**
    ```bash
    yarn dev
    ```
    这将编译 TypeScript 代码并在本地运行 `lucky-ts`。

## 发布流程

项目维护者可以使用以下命令来发布新版本：

1.  **更新版本号**
    ```bash
    npm version patch  # 或者 minor, major 根据改动类型决定
    ```
2.  **发布到 NPM**
    ```bash
    npm publish --registry https://registry.npmjs.org
    ```

## 提交 Pull Request

1.  Fork 本仓库。
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)。
3.  提交您的改动 (`git commit -m 'Add some AmazingFeature'`)。
4.  推送到远程分支 (`git push origin feature/AmazingFeature`)。
5.  开启一个 Pull Request。

## 代码规范

请确保您的代码遵循项目的代码风格。在提交前，可以运行 `yarn lint` 来检查和自动修复一些代码风格问题。

感谢您的贡献！
