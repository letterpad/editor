import React, { DetailedHTMLProps, SFC, HTMLAttributes } from "react";
import { Node } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";

/* eslint-disable react/prop-types */
const HeadingsNode: SFC<{
  attributes: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  node: Node;
}> = ({ attributes, children, node }) => {
  if (isTextNode(node)) return null;

  switch (node.type) {
    case "h1":
      return <h1 {...attributes}>{children}</h1>;
    case "h2":
      return <h2 {...attributes}>{children}</h2>;
    case "h3":
      return <h3 {...attributes}>{children}</h3>;
    case "h4":
      return <h4 {...attributes}>{children}</h4>;
    case "h5":
      return <h5 {...attributes}>{children}</h5>;
    case "h6":
      return <h6 {...attributes}>{children}</h6>;
  }
  return null;
};

export default HeadingsNode;
