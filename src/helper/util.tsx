import React from "react";
import { EditorButton } from "../plugins";
import { Block, Value } from "slate";

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
      if (attr === "style") {
        value = convertStyleToObject(value);
      }
      attrs[attr] = value;
    }
  });
  return attrs;
};

export const getCodeBlockParent = (value: Value, tagName: string) => {
  let parentNode = value.anchorBlock;
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
