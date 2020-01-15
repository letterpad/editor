import React from "react";
import OrderedListNode from "./OrderedListNode";
import UnorderedListNode from "./UnorderedListNode";
import ListItemNode from "./ListItemNode";

export const RenderNode = (type: string, props: any) => {
  if (type === "ul") {
    return <UnorderedListNode {...props} data-id="plugin-list" />;
  } else if (props.node.type === "ol") {
    return <OrderedListNode {...props} data-id="plugin-list" />;
  } else if (props.node.type === "li") {
    return <ListItemNode {...props} data-id="plugin-list" />;
  }
};
