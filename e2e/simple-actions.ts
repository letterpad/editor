import { EditorHandle } from "./serialize";

export async function repeatKey(key: string, times: number): Promise<any> {
  for (let i = 0; i < times; i++) {
    await page.keyboard.press(key);
  }
}

export async function clearEditor(_: EditorHandle): Promise<any> {
  await page.evaluate(`void window.__letterpadEditor.moveToRangeOfDocument()`);
  await page.keyboard.press("Backspace");
  await page.waitFor(5);
}

export async function clickXPath(xPath: string): Promise<any> {
  const featureHandlers = await page.$x(xPath);
  if (featureHandlers.length < 1) {
    throw new Error(`Feature Button xpath="${xPath}" not found`);
  }

  await featureHandlers[0].click();
}
