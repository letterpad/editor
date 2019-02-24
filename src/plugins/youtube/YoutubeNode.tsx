import React, { SFC } from "react";
import { Block } from "slate";

const YoutubeNode: SFC<{
  attributes: any;
  node: Block;
}> = ({ node, attributes, children }) => {
  const attrs: { [key: string]: string } = {};
  node.data.map((value, attr) => {
    if (typeof attr === "string") {
      attrs[attr] = value;
    }
  });

  return (
    <iframe
      {...attributes}
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      frameBorder="0"
      {...attrs}
    >
      {children}
    </iframe>
  );
};

export default YoutubeNode;
