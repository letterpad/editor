import { ElementHandle } from "puppeteer";
import cheerio from "cheerio";

type EditorHandle = ElementHandle<Element>;

async function getHtmlContents(handle: EditorHandle): Promise<string> {
  const context = await handle.executionContext();
  const html = await context.evaluate(node => node.innerHTML, handle);

  const cHtml = cheerio.load(html);
  const allNodes = cHtml("*");
  for (let i = 0; i < allNodes.length; i++) {
    const node = allNodes[i];
    for (let attr in node.attribs) {
      if (attr.startsWith("data-")) {
        allNodes.removeAttr(attr);
      }
    }
  }

  return cHtml.html();
}

async function repeatKey(key: string, times: number): Promise<any> {
  for (let i = 0; i < times; i++) {
    await page.keyboard.press(key);
  }
}

// async function jsonValue(handle: EditorHandle): Promise<any> {
//   const textContent = await handle.getProperty("textContent");
//   return textContent.jsonValue();
// }

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
    expect(await getHtmlContents(editorHandle!)).toMatchSnapshot();
  });

  test("adding some text", async () => {
    await clearEditor(editorHandle);
    await page.keyboard.type("Hello World!");
    expect(await getHtmlContents(editorHandle!)).toMatchSnapshot();
  });

  test("bold", async () => {
    await clearEditor(editorHandle);
    await page.keyboard.type("This is a sample text");
    const textHandlers = await page.$x("//span[contains(text(), 'sample')]");
    expect(textHandlers.length).toBeGreaterThan(0);

    await repeatKey("ArrowLeft", 5); // move 5 left
    await page.keyboard.down("Shift");
    await repeatKey("ArrowLeft", 6); // move 6 left
    await page.keyboard.up("Shift");
    await page.keyboard.down("Meta");
    await page.keyboard.press("b");
    await page.keyboard.up("Meta");
    await page.waitFor(50);

    const boldHandlers = await page.$x(
      "//span[contains(text(), 'format_bold')]"
    );
    expect(boldHandlers.length).toBeGreaterThan(0);
    boldHandlers[0].click();
    await page.waitFor(50);

    expect(await getHtmlContents(editorHandle)).toMatchSnapshot();
  });
});
