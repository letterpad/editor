import { EditorHandle } from "./serialize";

export async function repeatKey(key: string, times: number): Promise<any> {
  for (let i = 0; i < times; i++) {
    await page.keyboard.press(key);
  }
}

export async function clearEditor(_: EditorHandle): Promise<any> {
  await page.evaluate(`void window.__letterpadEditor.moveToRangeOfDocument()`);
  await page.keyboard.press("Delete");
  await page.waitFor(1);
}
