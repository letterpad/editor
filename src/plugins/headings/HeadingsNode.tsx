import React, { DetailedHTMLProps, SFC, HTMLAttributes } from "react";
import { Block } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";
import { getAttributesFromNode } from "../../helper/util";

/* eslint-disable react/prop-types */
const HeadingsNode: SFC<{
  attributes: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  node: Block;
}> = ({ attributes, children, node }) => {
  if (isTextNode(node)) return null;
  const attrs = getAttributesFromNode(node);

  switch (node.type) {
    case "h1":
      return (
        <h1 {...attributes} {...attrs}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 {...attributes} {...attrs}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 {...attributes} {...attrs}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 {...attributes} {...attrs}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 {...attributes} {...attrs}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 {...attributes} {...attrs}>
          {children}
        </h6>
      );
  }
  return null;
};

export default HeadingsNode;
