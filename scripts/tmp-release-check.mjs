import { writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

const target = await fetch("http://127.0.0.1:9224/json/new?about:blank", { method: "PUT" }).then(response => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
let id = 0;
const pending = new Map();
const messages = [];
socket.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(JSON.stringify(message.error)));
    else request.resolve(message.result);
  } else if (message.method === "Runtime.consoleAPICalled" && ["warning", "error"].includes(message.params.type)) messages.push(message.params.type);
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const requestId = ++id;
    pending.set(requestId, { resolve, reject });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function inspect(width, height) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
  await send("Page.navigate", { url: "http://127.0.0.1:3100/iletisim" });
  for (let attempt = 0; attempt < 80; attempt++) {
    if (await evaluate(`document.readyState === "complete" && !!document.querySelector('section[aria-label="Ürün ve iletişim bilgileri"]')`)) break;
    await delay(100);
  }
  const selector = `section[aria-label="Ürün ve iletişim bilgileri"]`;
  const offset = await evaluate(`document.querySelector('${selector}').offsetTop`);
  await evaluate(`window.scrollTo({ top: ${offset} - innerHeight + 40, behavior: 'instant' })`);
  await delay(150);
  const entry = await evaluate(`(() => { const el=document.querySelector('${selector}'); return { y: getComputedStyle(el).getPropertyValue('--vehicle-y').trim(), position:getComputedStyle(el).backgroundPosition, attachment:getComputedStyle(el).backgroundAttachment, top:el.getBoundingClientRect().top }; })()`);
  await evaluate(`window.scrollBy({ top: ${Math.round(height * 0.35)}, behavior: 'instant' })`);
  await delay(150);
  const scrolled = await evaluate(`(() => { const el=document.querySelector('${selector}'); return { y: getComputedStyle(el).getPropertyValue('--vehicle-y').trim(), position:getComputedStyle(el).backgroundPosition, top:el.getBoundingClientRect().top }; })()`);
  await evaluate(`document.querySelector('${selector}').scrollIntoView({ block: 'start', behavior: 'instant' })`);
  await delay(100);
  const screenshot = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(`contact-${width}.png`, Buffer.from(screenshot.data, "base64"));
  return { entry, scrolled };
}
await send("Page.enable");
await send("Runtime.enable");
console.log(JSON.stringify({ mobile: await inspect(390, 844), desktop: await inspect(1440, 900), messages }, null, 2));
socket.close();
