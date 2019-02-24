import React, { SFC, DetailedHTMLProps, BlockquoteHTMLAttributes } from "react";
import { Block } from "slate";
import { getAttributesFromNode } from "../../helper/util";

const BlockquoteNode: SFC<{
  attributes: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  node: Block;
}> = ({ attributes, children, node }) => {
  const attrs = getAttributesFromNode(node);
  return (
    <blockquote {...attributes} {...attrs}>
      {children}
    </blockquote>
  );
};

export default BlockquoteNode;
