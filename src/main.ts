#!/usr/bin/env node

import { spawn } from "child_process";
import { Command } from "commander";

const program: Command = new Command();

const DEFAULT_WEBSITE = "luckycurve.asia";

program
	.name("lucky-ts")
	.description("CLI to some common utilities")
	.version("0.0.1");

program
	.command("ssh <target>")
	.description("Connect to a remote server via SSH")
	.action((target) => {
		const websiteSuffix = process.env["LUCKY_WEBSITE"] || DEFAULT_WEBSITE;
		console.log(`Connecting to ${target}.${websiteSuffix} via SSH...`);
		const ssh = spawn("ssh", [`root@${target}.${websiteSuffix}`], {
			stdio: "inherit",
		});
		ssh.on("close", (code) => {
			if (code !== 0) {
				console.log(`ssh process exited with code ${code}`);
			}
		});
	});
program.parse();
