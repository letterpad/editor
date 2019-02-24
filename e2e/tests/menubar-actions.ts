import { EditorHandle, getHtmlContents } from "../serialize";
import { clearEditor, repeatKey, clickXPath } from "../simple-actions";
import {
  applyEditorFeatureToSampleText,
  applyEditorFeatureToLine
} from "../compound-actions";
import params from "../params";

describe("features", () => {
  let editorHandle: EditorHandle;

  beforeAll(async () => {
    await page.goto(params.testServer);
    await page.waitForXPath("//div[@contenteditable='true']");
    const handle = await page.$('div[contenteditable="true"]');
    editorHandle = handle!;
    await editorHandle.focus();
  });

  test("clearing editor", async () => {
    await clearEditor(editorHandle);
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  test("adding some text", async () => {
    await clearEditor(editorHandle);
    await page.keyboard.type("Hello World!");
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  test("bold", async () => {
    await applyEditorFeatureToSampleText(
      editorHandle,
      "//span[contains(text(), 'format_bold')]"
    );
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  test("italics", async () => {
    await applyEditorFeatureToSampleText(
      editorHandle,
      "//span[contains(text(), 'format_italic')]"
    );
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  test("underline", async () => {
    await applyEditorFeatureToSampleText(
      editorHandle,
      "//span[contains(text(), 'format_underline')]"
    );
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  test("headings", async () => {
    await applyEditorFeatureToLine(
      editorHandle,
      "//span[contains(text(), 'looks_one')]"
    );
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
    await applyEditorFeatureToLine(
      editorHandle,
      "//span[contains(text(), 'looks_two')]"
    );
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  test("blockquote", async () => {
    await applyEditorFeatureToLine(
      editorHandle,
      "//span[contains(text(), 'format_quote')]"
    );
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });

  describe("markdown", () => {
    test("bold", async () => {
      await clearEditor(editorHandle);
      const text = "foo";
      await page.keyboard.type(text);
      await page.keyboard.down("Shift");
      await repeatKey("ArrowLeft", text.length);
      await page.keyboard.up("Shift");
      await clickXPath("//span[contains(text(), 'format_bold')]");
      const actual = await getHtmlContents(editorHandle);

      await clearEditor(editorHandle);
      await page.keyboard.type("**foo**");
      // because this transformation adds an extra space
      await page.keyboard.press("Backspace");
      const expected = await getHtmlContents(editorHandle);

      expect(expected).toBe(actual);
    });
  });
});
