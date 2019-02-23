import React, { SFC } from "react";
import { applyBlockquote } from "./BlockquoteUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { Editor } from "slate";

const BlockquoteButton: SFC<{
  editor: Editor;
}> = ({ editor }) => {
  if (!editor) return <span />;
  const type = "blockquote";

  return (
    <Button
      isActive={hasBlock(editor.value, type)}
      icon="format_quote"
      onMouseUp={() => {
        const isActive = hasBlock(editor.value, type);
        return applyBlockquote(editor, isActive ? "paragraph" : type);
      }}
    />
  );
};
export default BlockquoteButton;
