import params from "../params";
import { EditorHandle, getHtmlContents } from "../serialize";
import { fillSampleList } from "../compound-actions";

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
});
