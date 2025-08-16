#!/usr/bin/env node

import { Command } from "commander";
import { ssh } from "./service/ssh.js";
import {
  addSshConnection,
  listSshConnections,
  removeSshConnection,
  getSshConnection,
  addInstanceConnection,
  listInstanceConnections,
  removeInstanceConnection,
  getInstances,
} from "./service/config.js";
import pkg from "../package.json" with { type: "json" };
import { lighthousePriceSearch, lighthouseReboot } from "./service/cloud.js";

const program: Command = new Command()
  .name("lucky-ts")
  .description("一个实用的 CLI 工具集")
  .version(pkg.version);

const configCommand = program
  .command("config")
  .description("管理一系列配置信息");

sshCommand(program, configCommand);
lighthouseCommand(program, configCommand);

program.parse();

function lighthouseCommand(program: Command, configCommand: Command) {
  // 询价
  program
    .command("lh-price")
    .description("查看轻量应用服务器的价格列表")
    .action(lighthousePriceSearch);

  // 重启
  program
    .command("reboot <target>")
    .description("重启指定的实例 (可使用别名)")
    .action((target: string) => {
      const instances = getInstances(target);
      if (instances.length === 0) {
        console.error(`错误: 未找到别名为 '${target}' 的实例配置。`);
        return;
      }
      lighthouseReboot(instances);
    });

  configCommand = configCommand
    .command("instance")
    .description("管理 Lighthouse 实例配置");

  configCommand
    .command("add <name> <region> <instanceId>")
    .description("添加一个新的实例配置")
    .action(addInstanceConnection);

  configCommand
    .command("ls")
    .description("列出所有已保存的实例配置")
    .action(listInstanceConnections);

  configCommand
    .command("rm <name>")
    .description("删除一个指定的实例配置")
    .action(removeInstanceConnection);
}

function sshCommand(program: Command, configCommand: Command) {
  // SSH 命令
  program
    .command("ssh <target>")
    .description("通过 SSH 连接到远程服务器 (可使用别名)")
    .action((target: string) => {
      // 尝试从配置中获取连接字符串，如果找不到，则直接使用 target
      const connectionString = getSshConnection(target) || target;
      ssh(connectionString);
    });

  configCommand = configCommand.command("ssh").description("管理 SSH 连接配置");

  configCommand
    .command("add <alias> <connectionString>")
    .description("添加一个新的 SSH 连接配置")
    .action(addSshConnection);

  configCommand
    .command("ls")
    .description("列出所有已保存的 SSH 连接配置")
    .action(listSshConnections);

  configCommand
    .command("rm <alias>")
    .description("删除一个指定的 SSH 连接配置")
    .action(removeSshConnection);
}
