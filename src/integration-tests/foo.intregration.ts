import { ElementHandle } from "puppeteer";

type EditorHandle = ElementHandle<Element>;

async function getTextContents(handle: EditorHandle): Promise<any> {
  const textContent = await handle.getProperty("textContent");
  return textContent.jsonValue();
}

async function clearEditor(handle: EditorHandle): Promise<any> {
  await handle.click({ clickCount: 3 });
  return page.keyboard.press("Delete");
}

describe("functionalities", () => {
  let editorHandle: EditorHandle;

  beforeAll(async () => {
    await page.goto("http://localhost:4343");
    await page.waitForXPath("/html/body/div");
    const handle = await page.$('div[contenteditable="true"]');
    editorHandle = handle!;
    await editorHandle.focus();
  });

  test("clearing editor", async () => {
    await clearEditor(editorHandle);
    expect(await getTextContents(editorHandle!)).toMatchInlineSnapshot(
      `"Compose a story..﻿"`
    );
  });

  test("part 2", async () => {
    await clearEditor(editorHandle);
    await page.keyboard.type("Hello World!");
    expect(await getTextContents(editorHandle!)).toMatchInlineSnapshot(
      `"Hello World!"`
    );
  });
});
