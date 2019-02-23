import React, { SFC, DetailedHTMLProps, ImgHTMLAttributes } from "react";
import styled from "styled-components";
import { Node, Editor } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";

/* eslint-disable react/prop-types */

const Image = styled.img`
  display: block;
  max-width: 100%;
  box-shadow: ${(props: any) =>
    props.selected ? "0 0 0 4px #414142;" : "none"};
`;

const ImageNode: SFC<{
  attributes: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  node: Node;
  editor: Editor;
  isFocused: boolean;
}> = ({ attributes, node }) => {
  if (isTextNode(node)) return null;
  return (
    <div>
      <img src={node.data.get("src")} {...attributes} />
      <div>
        <small>dsac</small>
      </div>
    </div>
  );
};

export default ImageNode;
