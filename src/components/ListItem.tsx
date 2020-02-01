import React from "react";
import { SlateNodeProps } from "../types";

export default function ListItem({
  children,
  node,
  attributes,
  ...props
}: SlateNodeProps) {
  return (
    <li {...attributes} className="lp-li" {...props}>
      {children}
    </li>
  );
}
