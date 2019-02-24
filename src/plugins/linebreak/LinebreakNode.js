import React from "react";
import { getAttributesFromNode } from "../../helper/util";

const LinebreakNode = ({ attributes, children, node }) => {
  const props = getAttributesFromNode(node);
  return (
    <span
      {...attributes}
      style={{
        borderBottom: "2px solid #000",
        display: "block",
        opacity: 0.2
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export default LinebreakNode;
