import CheckListItem from "./CheckListItem";
import React from "react";
import { SlateNodeProps } from "../types";

export default function ListItem({
  children,
  node,
  attributes,
  ...props
}: SlateNodeProps) {
  // @ts-ignore
  const checked = node.data.get("checked");

  if (checked !== undefined) {
    return (
      <CheckListItem node={node} attributes={attributes} {...props}>
        {children}
      </CheckListItem>
    );
  }
  return (
    <li {...attributes} className="lp-li">
      {children}
    </li>
  );
}
