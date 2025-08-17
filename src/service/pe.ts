import chalk from "chalk";
import * as cheerio from "cheerio";

async function fetchBondYield(): Promise<number> {
  try {
    const url = "https://sc.macromicro.me/series/354/10year-bond-yield";
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 使用指定的 CSS 选择器提取数据
    const selector =
      "#panel > main > div.mm-chart-collection > div.mm-cc-hd > div > div.mm-cc-chart-stats-title.pb-2.d-flex.flex-wrap.align-items-baseline > div.stat-val > span.val";
    const value = $(selector).text().trim();

    if (!value) {
      throw new Error("未能从页面中提取到数据");
    }

    return Number(value);
  } catch (error) {
    console.error("获取十年期国债收益率数据失败:", error);
    throw error;
  }
}

export async function peCommand(): Promise<void> {
  const value = await fetchBondYield();

  console.log(`十年期国债收益率: ${value}`);

  const pe = 100 / value;

  console.log(`50分 PE: ${chalk.green((pe * 0.5).toFixed(2))}`);
  console.log(`75分 PE: ${chalk.green((pe * 0.75).toFixed(2))}`);
  console.log(`标准 PE: ${chalk.green(pe.toFixed(2))}`);
  console.log(`1.25分 PE: ${chalk.green((pe * 1.25).toFixed(2))}`);
  console.log(`1.5分 PE: ${chalk.green((pe * 1.5).toFixed(2))}`);
}
