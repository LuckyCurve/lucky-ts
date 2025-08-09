#!/usr/bin/env node

import { Command } from "commander";
import { ssh } from "./service/ssh.js";

const program: Command = new Command();

program
    .name("lucky-ts")
    .description("CLI to some common utilities")
    .version("0.0.3");

program
    .command("ssh <target>")
    .description("Connect to a remote server via SSH")
    .action(ssh);

program.parse();
