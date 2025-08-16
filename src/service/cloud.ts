import { Client } from "tencentcloud-sdk-nodejs-lighthouse/tencentcloud/services/lighthouse/v20200324/lighthouse_client.js";
import { loadConfig, saveConfig, type InstanceElement } from "./config.js";
import { send } from "./notification.js";

const client = new Client({
  credential: {
    secretId: process.env["TENCENT_CLOUD_SECRET_ID"] || "default",
    secretKey: process.env["TENCENT_CLOUD_SECRET_KEY"] || "default",
  },
});

export async function lighthousePriceSearch() {
  while (true) {
    client.region = "ap-hongkong";

    const response = await client.DescribeBundles({
      Filters: [
        {
          Name: "bundle-type",
          Values: ["RAZOR_SPEED_BUNDLE"],
        },
      ],
    });

    const currentPrice =
      response.BundleSet?.filter(
        (bundle) =>
          bundle.BundleSalesState === "AVAILABLE" &&
          bundle.SupportLinuxUnixPlatform,
      )
        .sort((a, b) => {
          const priceA = a.Price?.InstancePrice?.DiscountPrice ?? 0;
          const priceB = b.Price?.InstancePrice?.DiscountPrice ?? 0;

          return priceA - priceB;
        })
        .map((bundle) => bundle.Price?.InstancePrice?.DiscountPrice ?? 0)[0] ??
      0;

    const config = loadConfig();
    const lastPrice = config.lastPrice ?? 0;

    if (currentPrice < lastPrice) {
      send(`价格下降通知: ${lastPrice} -> ${currentPrice}`);
    }
    config.lastPrice = currentPrice;
    saveConfig(config);

    console.log(`${new Date()} - 执行询价成功`);
    await new Promise((resolve) => setTimeout(resolve, 1000 * 10));
  }
}

export async function lighthouseReboot(instances: Array<InstanceElement>) {
  for (const instance of instances) {
    client.region = instance.region;

    const response = await client.RebootInstances({
      InstanceIds: [instance.instanceId],
    });

    console.log(response);
  }
}
