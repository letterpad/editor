import React from "react";
import { EditorButton } from "../plugins";
import { Block, Value } from "slate";

export const keyMap = {
  ESCAPE: 27,
  ENTER: 13
};

export const nodeTypes = {
  BLOCK: "block",
  TEXT: "text",
  INLINE: "inline"
};

export const MARK = "mark";

export const mapPropsToComponents = (
  componentList: EditorButton[],
  props?: any
) => {
  return componentList.map((item, index) => {
    return <item.button {...item.props} {...props} key={index} />;
  });
};

export const convertStyleToObject = (style: string) => {
  const obj: { [key: string]: string } = {};
  let s = style
    .toLowerCase()
    .replace(/-(.)/g, function(_, g) {
      return g.toUpperCase();
    })
    .replace(/;\s?$/g, "")
    .split(/:|;/g);
  for (let i = 0; i < s.length; i += 2)
    obj[s[i].replace(/\s/g, "")] = s[i + 1].replace(/^\s+|\s+$/g, "");
  return obj;
};

export const getAttributesFromNode = (node: Block) => {
  const attrs: { [key: string]: string } = {};
  node.data.map((value, attr) => {
    if (typeof attr === "string") {
      if (attr !== "style") {
        attrs[attr] = value;
      }
    }
  });
  return attrs;
};

export const getCodeBlockParent = (value: Value, tagName: string) => {
  let parentNode = value.anchorBlock;
  if (!parentNode) return null;
  do {
    if (parentNode.type === tagName) {
      return parentNode;
    }
  } while (((parentNode as any) = value.document.getParent(parentNode.key)));

  return null;
};

export const isPrintableKeycode = (keycode: number) => {
  return (
    (keycode > 47 && keycode < 58) || // number keys
    keycode == 32 ||
    keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
    (keycode > 64 && keycode < 91) || // letter keys
    (keycode > 95 && keycode < 112) || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223)
  ); // [\]' (in order)
};

/**
 * A helper function to return the content of a Prism `token`.
 *
 * @param {Object} token
 * @return {String}
 */

function getContent(token: string | Prism.Token): string {
  if (typeof token == "string") {
    return token;
  } else if (typeof token.content == "string") {
    return token.content;
  } else if (Array.isArray(token.content)) {
    return token.content.map(getContent).join("");
  } else {
    return getContent(token);
  }
}

export const isEmptyLine = (value: Value) => {
  const { selection, texts, blocks } = value;

  if (!value) return;
  if (!selection) return;

  const isCollapsed = selection.isCollapsed;
  const topBlock = blocks.get(0);
  const isAParagraph =
    topBlock && ["paragraph", "p", "section"].includes(topBlock.type);
  const isEmptyText = texts && texts.get(0) && texts.get(0).text.length === 0;

  return isCollapsed && isAParagraph && isEmptyText;
};

export const getAllDecorations = (tokens: any, texts: any): [] => {
  const decorations: any = [];
  let startText = texts.shift();

  const setDecoration = (tokens: any): void => {
    let startOffset = 0;
    let endOffset = 0;
    let start = 0;
    let endText = startText;
    for (const token of tokens) {
      startText = endText;
      startOffset = endOffset;
      if (startText == null) break;

      const content = getContent(token);
      const length = content.length;
      const end = start + length;

      let available = startText.text.length - startOffset;
      let remaining = length;

      endOffset = startOffset + remaining;
      while (available <= remaining && texts.length > 0) {
        endText = texts.shift();
        if (endText == null) break;

        remaining = length - available;
        available = endText.text.length;
        endOffset = remaining;
      }
      if (typeof token === "object" && token.type === "tag") {
        setDecoration(token.content);
      }

      if (typeof token != "string" && endText != null) {
        const dec = {
          anchor: {
            key: startText.key,
            offset: startOffset
          },
          focus: {
            key: endText.key,
            offset: endOffset
          },
          mark: {
            type: token.type || "constant"
          }
        };
        decorations.push(dec);
      }

      start = end;
    }
  };
  setDecoration(tokens);

  return decorations;
};
