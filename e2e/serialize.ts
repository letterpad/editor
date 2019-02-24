import { ElementHandle } from "puppeteer";
import cheerio from "cheerio";

export type EditorHandle = ElementHandle<Element>;

export async function getHtmlContents(handle: EditorHandle): Promise<string> {
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

export async function textContent(handle: EditorHandle): Promise<any> {
  const textContent = await handle.getProperty("textContent");
  return textContent.jsonValue();
}
