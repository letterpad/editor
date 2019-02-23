import React, { SFC, DetailedHTMLProps, HTMLAttributes } from "react";
import { Node } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const LinkNode: SFC<{
  attributes: DetailedHTMLProps<
    HTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
  node: Node;
}> = ({ attributes, node, children }) => (
  <a
    {...attributes}
    className="link-node"
    href={isTextNode(node) ? node.text : node.data.get("href")}
  >
    {children}
  </a>
);

export default LinkNode;
