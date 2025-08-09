#!/usr/bin/env node

import { Command } from "commander";
import { ssh } from "./service/ssh.js";
import pkg from "../package.json" with { type: "json" };

const program: Command = new Command();

program
    .name("lucky-ts")
    .description("CLI to some common utilities")
    .version(pkg.version);

program
    .command("ssh <target>")
    .description("Connect to a remote server via SSH")
    .action(ssh);

program.parse();
