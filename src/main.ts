#!/usr/bin/env node

import { Command } from "commander";
import { ssh } from "./service/ssh.js";
import {
    addConnection,
    listConnections,
    removeConnection,
    getConnection,
} from "./service/config.js";
import pkg from "../package.json" with { type: "json" };

const program: Command = new Command();

program
    .name("lucky-ts")
    .description("一个实用的 CLI 工具集")
    .version(pkg.version);

// SSH 命令
program
    .command("ssh <target>")
    .description("通过 SSH 连接到远程服务器 (可使用别名)")
    .action((target: string) => {
        // 尝试从配置中获取连接字符串，如果找不到，则直接使用 target
        const connectionString = getConnection(target) || target;
        ssh(connectionString);
    });

// 配置管理命令
const configCommand = program
    .command("config")
    .description("管理 SSH 连接配置");

configCommand
    .command("add <alias> <connectionString>")
    .description("添加一个新的 SSH 连接配置")
    .action(addConnection);

configCommand
    .command("ls")
    .description("列出所有已保存的 SSH 连接配置")
    .action(listConnections);

configCommand
    .command("rm <alias>")
    .description("删除一个指定的 SSH 连接配置")
    .action(removeConnection);

program.parse();
