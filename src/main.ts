#!/usr/bin/env node

import { spawn } from "child_process";
import { Command } from "commander";
const program: Command = new Command();
program
	.name("lucky-ts")
	.description("CLI to some common utilities")
	.version("0.0.1");
program
	.command("ssh <target>")
	.description("Connect to a remote server via SSH")
	.action((target) => {
		const ssh = spawn("ssh", [target], { stdio: "inherit" });
		ssh.on("close", (code) => {
			if (code !== 0) {
				console.log(`ssh process exited with code ${code}`);
			}
		});
	});
program.parse();
