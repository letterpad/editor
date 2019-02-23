import React, { SFC, DetailedHTMLProps, BlockquoteHTMLAttributes } from "react";

/* eslint-disable react/prop-types */
const BlockquoteNode: SFC<{
  attributes: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}> = ({ attributes, children }) => (
  <blockquote {...attributes}>{children}</blockquote>
);

export default BlockquoteNode;
