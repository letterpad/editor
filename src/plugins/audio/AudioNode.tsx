import React, {
  SFC,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement
} from "react";
import { Block } from "slate";

const AudioNode: SFC<{
  attributes: DetailedHTMLProps<
    HTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement
  >;
  node: Block;
  children: ReactElement;
}> = ({ attributes, node, children }) => (
  <audio {...attributes} controls src={node.data.get("src")}>
    {children}
  </audio>
);

export default AudioNode;
