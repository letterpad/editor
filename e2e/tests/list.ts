import params from "../params";
import { EditorHandle, getHtmlContents } from "../serialize";
import { fillSampleList } from "../compound-actions";
jest.setTimeout(20000);

describe("list", () => {
  let editorHandle: EditorHandle;
  beforeAll(async () => {
    await page.goto(params.testServer);
    await page.waitForXPath("//div[@contenteditable='true']");
    const handle = await page.$('div[contenteditable="true"]');
    editorHandle = handle!;
    await editorHandle.focus();
  });

  test("list works", async () => {
    await fillSampleList(editorHandle);
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  test("shift tab", async () => {
    await fillSampleList(editorHandle);
    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  test("backspace", async () => {
    await fillSampleList(editorHandle);
    const currentContent = await getHtmlContents(editorHandle);
    await page.keyboard.press("Enter");
    await page.keyboard.press("Backspace");
    const newContent = await getHtmlContents(editorHandle);
    expect(currentContent).toBe(newContent);
  });

  test("enter should continue in document", async () => {
    await fillSampleList(editorHandle);
    // create a new bullet point
    await page.keyboard.press("Enter");
    // with an empty bullet exit to document
    await page.keyboard.press("Enter");
    // type something
    await page.keyboard.type("This should be part of document.");
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });
});
