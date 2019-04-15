import { parseFragment, serialize } from "parse5";

function removeData(root) {
  if (root.tagName === "iframe") {
    root.childNodes = [];
  }
  if (root.attrs) {
    root.attrs = root.attrs.filter(
      attr => !attr.name.startsWith("data-") && attr.name !== "class"
    );
  }
  if (root.childNodes) {
    for (const node of root.childNodes) {
      removeData(node);
    }
  }
}

export async function getHtmlContents() {
  return new Promise((resolve, reject) => {
    cy.get("div[contenteditable='true']").then(handle => {
      const fragment = parseFragment(handle[0].innerHTML);
      removeData(fragment);

      resolve(serialize(fragment));
    });
  });
}

export async function textContent(handle) {
  const textContent = await handle.getProperty("textContent");
  return textContent.jsonValue();
}
