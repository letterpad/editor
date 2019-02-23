import { EditorHandle } from "./serialize";

export async function repeatKey(key: string, times: number): Promise<any> {
  for (let i = 0; i < times; i++) {
    await page.keyboard.press(key);
  }
}

export async function clearEditor(handle: EditorHandle): Promise<any> {
  await handle.click({ clickCount: 3 });
  return page.keyboard.press("Delete");
}
