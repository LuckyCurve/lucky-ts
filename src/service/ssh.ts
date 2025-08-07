import { spawn } from "child_process";
const DEFAULT_WEBSITE = "luckycurve.asia";

function ssh(target: string): void {
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
}

export default ssh;
