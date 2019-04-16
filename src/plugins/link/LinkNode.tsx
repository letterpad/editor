import React, { SFC, DetailedHTMLProps, HTMLAttributes } from "react";
import { Node } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";
import styled from "styled-components";

const Wrapper = styled.a`
  color: inherit;
  text-decoration: underline;
`;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const LinkNode: SFC<{
  attributes: DetailedHTMLProps<
    HTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
  node: Node;
}> = ({ attributes, node, children }) => (
  <Wrapper
    {...attributes}
    className="link-node"
    href={isTextNode(node) ? node.text : node.data.get("href")}
    data-id="plugin-link"
  >
    {children}
  </Wrapper>
);

export default LinkNode;
