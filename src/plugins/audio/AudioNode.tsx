import React, { SFC, DetailedHTMLProps, HTMLAttributes } from "react";
import { Block } from "slate";
import { getAttributesFromNode } from "../../helper/util";

const AudioNode: SFC<{
  attributes: DetailedHTMLProps<
    HTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement
  >;
  node: Block;
}> = ({ attributes, node, children }) => {
  const attrs = getAttributesFromNode(node);
  return (
    <audio {...attributes} controls {...attrs}>
      {children}
    </audio>
  );
};

export default AudioNode;
