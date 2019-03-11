import React, { SFC } from "react";
import { Block } from "slate";
import { getAttributesFromNode } from "../../helper/util";

const EmbedNode: SFC<{
  attributes: any;
  node: Block;
}> = ({ node, attributes, children }) => {
  const attrs = getAttributesFromNode(node);

  return (
    <iframe
      {...attributes}
      type="text/html"
      width="100%"
      height="400px"
      frameBorder="0"
      {...attrs}
    >
      {children}
    </iframe>
  );
};

export default EmbedNode;
