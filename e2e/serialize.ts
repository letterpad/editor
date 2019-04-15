import { ElementHandle } from "puppeteer";
import { parseFragment, serialize } from "parse5";

export type EditorHandle = ElementHandle<Element> | any;

function removeData(root: any) {
  if (root.tagName === "iframe") {
    root.childNodes = [];
  }
  if (root.attrs) {
    root.attrs = root.attrs.filter(
      (attr: any) => !attr.name.startsWith("data-") && attr.name !== "class"
    );
  }
  if (root.childNodes) {
    for (const node of root.childNodes) {
      removeData(node);
    }
  }
}

export async function getHtmlContents(handle: EditorHandle): Promise<string> {
  const context = await handle.executionContext();
  const html = await context.evaluate((node: any) => node.innerHTML, handle);
  const fragment = parseFragment(html);
  removeData(fragment);
  return serialize(fragment);
}

export async function textContent(handle: EditorHandle): Promise<any> {
  const textContent = await handle.getProperty("textContent");
  return textContent.jsonValue();
}
