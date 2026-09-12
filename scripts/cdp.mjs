import { writeFile, mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
export { delay };
export async function browser() {
  const target = await fetch('http://127.0.0.1:9224/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const events = [];
  socket.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); clearTimeout(p.timer); pending.delete(m.id); if (m.error) p.reject(new Error(JSON.stringify(m.error))); else p.resolve(m.result); }
    else events.push(m);
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id;
    const timer = setTimeout(() => { pending.delete(n); reject(new Error(method + ' timed out')); }, 25000);
    pending.set(n, { resolve, reject, timer }); socket.send(JSON.stringify({ id: n, method, params }));
  });
  const evaluate = async expression => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails)); return r.result.value; };
  const viewport = async (width, height = 900) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 });
  const navigate = async url => { const result = await send('Page.navigate', { url }); await delay(1200); for (let i = 0; i < 35; i++) { if (await evaluate("document.readyState === 'complete'")) break; await delay(250); } return result; };
  const shot = async (path, full = false) => { await mkdir(path.slice(0, path.lastIndexOf('/')), { recursive: true }); const metrics = full ? await send('Page.getLayoutMetrics') : null; const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full, ...(full ? { clip: { x: 0, y: 0, width: metrics.cssContentSize.width, height: metrics.cssContentSize.height, scale: 1 } } : {}) }); await writeFile(path, Buffer.from(r.data, 'base64')); };
  const key = async (key, modifiers = 0) => { const v = { Tab: 9, Enter: 13, Escape: 27, ArrowDown: 40 }[key]; await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code: key, modifiers, windowsVirtualKeyCode: v }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key, modifiers, windowsVirtualKeyCode: v }); };
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  return { send, evaluate, viewport, navigate, shot, key, events, close: () => socket.close() };
}
