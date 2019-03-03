import React from "react";
import { applyBlockquote } from "./BlockquoteUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";

import { EditorButtonComponent } from "..";

const BlockquoteButton: EditorButtonComponent = ({ editor }) => {
  if (!editor) return <span />;
  const type = "blockquote";

  return (
    <Button
      isActive={hasBlock(editor.value, type)}
      icon="format_quote"
      onMouseDown={() => {
        const isActive = hasBlock(editor.value, type);
        return applyBlockquote(editor, isActive ? "p" : type);
      }}
    />
  );
};
export default BlockquoteButton;
