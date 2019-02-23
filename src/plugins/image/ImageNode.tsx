import React, { SFC, DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { Node, Editor } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";

/* eslint-disable react/prop-types */

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
