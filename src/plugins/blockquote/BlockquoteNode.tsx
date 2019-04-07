import React, { SFC, DetailedHTMLProps, BlockquoteHTMLAttributes } from "react";
import { Block } from "slate";
import { getAttributesFromNode } from "../../helper/util";
import styled from "styled-components";

const Wrapper = styled.blockquote`
  text-align: left;
  border-left: 4px solid var(--bg-success);
  padding: 2px 8px;
  cite {
    display: block;
    font-size: 17px;
    color: #bbb;
    margin: 30px 0;
  }
`;
const BlockquoteNode: SFC<{
  attributes: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  node: Block;
}> = ({ attributes, children, node }) => {
  const attrs = getAttributesFromNode(node);
  return (
    <Wrapper {...attributes} {...attrs} data-name="blockquote">
      {children}
    </Wrapper>
  );
};

export default BlockquoteNode;
