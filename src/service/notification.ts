import notifier from "node-notifier";

export function send(message: string): void {
  notifier.notify({
    title: "lucky-ts",
    message: `${message}`,
  });
}
