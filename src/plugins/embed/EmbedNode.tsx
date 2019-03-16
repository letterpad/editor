import React, { SFC } from "react";
import { Block } from "slate";
import { getAttributesFromNode } from "../../helper/util";
import { parseGistUrl } from "./EmbedUtils";
import Gist from "./EmbedGist";

const EmbedNode: SFC<{
  attributes: any;
  node: Block;
}> = ({ node, attributes, children }) => {
  const attrs = getAttributesFromNode(node);
  if (attrs.src.indexOf("gist.github") >= 0) {
    const { file, id } = parseGistUrl(attrs.src);
    return (
      <Gist id={id} file={file} attributes={attributes} children={children} />
    );
  }
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
