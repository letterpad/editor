import React from "react";
import { applyBlockquote } from "./BlockquoteUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../_components/Button";

import { EditorButtonComponent } from "..";

const BlockquoteButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;
  const type = "blockquote";

  return (
    <Button
      isActive={hasBlock((editor as any).value, type)}
      icon="format_quote"
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(
          e,
          "plugin-blockquote",
          callbacks
        );
        if (hookCalled) return;
        const isActive = hasBlock((editor as any).value, type);
        return applyBlockquote(editor, isActive ? "p" : type);
      }}
    />
  );
};
export default BlockquoteButton;
