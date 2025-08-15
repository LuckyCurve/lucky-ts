import { Client } from "tencentcloud-sdk-nodejs-lighthouse/tencentcloud/services/lighthouse/v20200324/lighthouse_client.js";
import type { InstanceElement } from "./config.js";

const client = new Client({
    credential: {
        secretId: process.env["TENCENT_CLOUD_SECRET_ID"] || "default",
        secretKey: process.env["TENCENT_CLOUD_SECRET_KEY"] || "default",
    },
});

export async function lighthousePriceSearch() {
    client.region = "ap-hongkong";

    const response = await client.DescribeBundles({
        Filters: [
            {
                Name: "bundle-type",
                Values: ["RAZOR_SPEED_BUNDLE"],
            },
        ],
    });

    console.log(
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
            .map(
                (bundle) => bundle.Price?.InstancePrice?.DiscountPrice ?? 0,
            )[0],
    );
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
