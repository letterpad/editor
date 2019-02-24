import React from "react";
import { EditorButton } from "../plugins";
import { Block } from "slate";

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
