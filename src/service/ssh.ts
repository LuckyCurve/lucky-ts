import { spawn } from "child_process";

/**
 * 通过 SSH 连接到远程服务器
 * @param {string} connectionString - 完整的 SSH 连接字符串 (例如: user@host)
 */
export function ssh(connectionString: string): void {
    console.log(`正在通过 SSH 连接到 ${connectionString}...`);
    const sshProcess = spawn("ssh", [connectionString], {
        stdio: "inherit", // 将子进程的 stdio 连接到父进程
    });

    sshProcess.on("close", (code) => {
        if (code !== 0) {
            console.log(`SSH 进程已退出，退出码: ${code}`);
        }
    });

    sshProcess.on("error", (err) => {
        console.error(`无法启动 SSH 进程: ${err.message}`);
    });
}
