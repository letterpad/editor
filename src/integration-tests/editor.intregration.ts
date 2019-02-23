import {
  EditorHandle,
  getHtmlContents
} from "../integration-tests-utils/serialize";
import { clearEditor } from "../integration-tests-utils/simple-actions";
import { applyEditorFeatureToSampleText } from "../integration-tests-utils/compound-actions";

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
    expect(await getHtmlContents(editorHandle!)).toMatchSnapshot();
  });

  test("adding some text", async () => {
    await clearEditor(editorHandle);
    await page.keyboard.type("Hello World!");
    expect(await getHtmlContents(editorHandle!)).toMatchSnapshot();
  });

  test("bold", async () => {
    await applyEditorFeatureToSampleText(
      editorHandle,
      "//span[contains(text(), 'format_bold')]"
    );
    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });
});
