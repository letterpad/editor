import React, { SFC } from "react";
import { Block } from "slate";
import { getAttributesFromNode } from "../../helper/util";

const YoutubeNode: SFC<{
  attributes: any;
  node: Block;
}> = ({ node, attributes, children }) => {
  const attrs = getAttributesFromNode(node);
  return (
    <iframe
      {...attributes}
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
