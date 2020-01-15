import React from "react";
import { SlateNodeProps } from "../types";
// import type { SlateNodeProps } from "../types";

export default function Paragraph({ attributes, children }: SlateNodeProps) {
  return <p {...attributes}>{children}</p>;
}
