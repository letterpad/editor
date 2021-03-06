import React from "react";
import { SlateNodeProps } from "../types";

export default function Paragraph({ attributes, children }: SlateNodeProps) {
  return (
    <div {...attributes} className="lp-paragraph">
      {children}
    </div>
  );
}
