import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import Button from "../../components/Button";
import { Editor } from "slate";

const BoldButton = ({
  editor,
  callbacks
}: {
  editor: Editor;
  callbacks: { [key: string]: (...args: any[]) => any };
}) => {
  if (!editor) return <span />;
  return (
    <Button
      isActive={isMarkActive(editor.value, "em")}
      icon="format_italic"
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(
          e,
          "plugin-italic",
          callbacks
        );
        if (hookCalled) return;
        e.preventDefault();
        return applyMarkStrategy(editor, "em");
      }}
    />
  );
};

export default BoldButton;
