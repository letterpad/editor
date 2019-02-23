import React, { SFC } from "react";
import { Block } from "slate";

const YoutubeNode: SFC<{
  attributes: any;
  node: Block;
}> = ({ node, attributes, children }) => (
  <iframe
    {...attributes}
    id="ytplayer"
    type="text/html"
    width="640"
    height="360"
    src={node.data.get("src")}
    frameborder="0"
  >
    {children}
  </iframe>
);

export default YoutubeNode;
