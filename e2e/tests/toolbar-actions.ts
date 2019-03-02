import { EditorHandle, getHtmlContents } from "../serialize";
import { clearEditor, clickXPath } from "../simple-actions";

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

  describe("markdown", () => {
    beforeEach(async () => {
      await editorHandle.focus();
      await clearEditor(editorHandle);
      await page.evaluate(() => {
        window.prompt = () => "http://localhost/embed/link";
      });
      await page.evaluate(
        'document.querySelector("#letterpad-editor-toolbar-toggle-button").click()'
      );
      // await page.click("#letterpad-editor-toolbar-toggle-button");
      // await clickXPath("//*[@id='letterpad-editor-toolbar-toggle-button']");
      await page.waitFor(300);
    });

    test("audio", async () => {
      await clickXPath("//span[contains(text(), 'queue_music')]");
      const expected = await getHtmlContents(editorHandle);

      await clearEditor(editorHandle);
      const text = "[audio=http://localhost/embed/link]";
      await page.keyboard.type(text);
      // because this transformation adds an extra space
      await page.keyboard.press("Backspace");
      const actual = await getHtmlContents(editorHandle);

      expect(expected).toBe(actual);
    });

    test("youtube", async () => {
      await clickXPath("//span[contains(text(), 'music_video')]");
      const expected1 = await getHtmlContents(editorHandle);

      await clearEditor(editorHandle);
      const text = "[youtube=http://localhost/embed/link]";
      await page.keyboard.type(text);
      // because this transformation adds an extra space
      await page.keyboard.press("Backspace");
      const expected2 = await getHtmlContents(editorHandle);

      expect(expected1).toMatchSnapshot();
      expect(expected2).toMatchSnapshot();
    });

    test("image", async () => {
      await clickXPath("//span[contains(text(), 'image')]");
      const expected = await getHtmlContents(editorHandle);

      expect(expected).toMatchSnapshot();
    });

    test("separator", async () => {
      await clickXPath("//span[contains(text(), 'more_horiz')]");
      const actual = await getHtmlContents(editorHandle);
      expect(actual).toMatchSnapshot();
    });
  });
});