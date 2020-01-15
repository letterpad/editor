import React from "react";
import { isMarkActive, applyMarkStrategy } from "../../helper/strategy";
import Button from "../../_components/Button";
import { EditorButtonComponent } from "..";

const highlightButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;
  const active = isMarkActive(editor.value, "code");

  return (
    <Button
      isActive={active}
      icon="highlight"
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(
          e,
          "plugin-highlight",
          callbacks
        );
        if (hookCalled) return;
        e.preventDefault();
        return applyMarkStrategy(editor, "code");
      }}
    />
  );
};
export default highlightButton;
