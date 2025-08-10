import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import os from "os";

/**
 * 定义配置对象的接口
 * @interface
 */
interface IConfig {
    [key: string]: string;
}

// 定义配置文件的目录和路径
const CONFIG_DIR = join(os.homedir(), ".lucky-ts");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

/**
 * 确保配置文件目录存在
 * 如果目录不存在，则会创建它
 */
const ensureConfigDirExists = (): void => {
    if (!existsSync(CONFIG_DIR)) {
        mkdirSync(CONFIG_DIR);
    }
};

/**
 * 从文件中加载配置
 * @returns {IConfig} 返回一个配置对象
 */
const loadConfig = (): IConfig => {
    ensureConfigDirExists();
    if (!existsSync(CONFIG_FILE)) {
        return {};
    }
    const data = readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(data) as IConfig;
};

/**
 * 将配置保存到文件
 * @param {IConfig} config - 需要保存的配置对象
 */
const saveConfig = (config: IConfig): void => {
    ensureConfigDirExists();
    const data = JSON.stringify(config, null, 2);
    writeFileSync(CONFIG_FILE, data, "utf-8");
};

/**
 * 添加一个新的 SSH 连接配置
 * @param {string} alias - 连接的别名
 * @param {string} connectionString - 连接字符串 (例如: user@host)
 */
export const addConnection = (
    alias: string,
    connectionString: string,
): void => {
    const config = loadConfig();
    if (config[alias]) {
        console.warn(
            `别名 '${alias}' 已存在，并指向 '${config[alias]}'。将被覆盖。`,
        );
    }
    config[alias] = connectionString;
    saveConfig(config);
    console.log(`成功添加别名 '${alias}' -> '${connectionString}'`);
};

/**
 * 列出所有已保存的 SSH 连接配置
 */
export const listConnections = (): void => {
    const config = loadConfig();
    if (Object.keys(config).length === 0) {
        console.log("没有找到任何已保存的连接配置。");
        return;
    }
    console.log("已保存的 SSH 连接:");
    for (const alias in config) {
        console.log(`  - ${alias}: ${config[alias]}`);
    }
};

/**
 * 删除一个指定的 SSH 连接配置
 * @param {string} alias - 要删除的连接别名
 */
export const removeConnection = (alias: string): void => {
    const config = loadConfig();
    if (!config[alias]) {
        console.error(`错误: 别名 '${alias}' 不存在。`);
        return;
    }
    delete config[alias];
    saveConfig(config);
    console.log(`成功删除别名 '${alias}'。`);
};

/**
 * 获取指定别名的连接字符串
 * @param {string} alias - 要查找的别名
 * @returns {string | undefined} 如果找到则返回连接字符串，否则返回 undefined
 */
export const getConnection = (alias: string): string | undefined => {
    const config = loadConfig();
    return config[alias];
};
