import React from "react";
import { isMarkActive, applyMarkStrategy } from "../../helper/strategy";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";

const highlightButton: EditorButtonComponent = ({ editor }) => {
  if (!editor) return <span />;
  const active = isMarkActive(editor.value, "code");

  return (
    <Button
      isActive={active}
      icon="border_color"
      onMouseUp={e => {
        e.preventDefault();
        return applyMarkStrategy(editor, "code");
      }}
    />
  );
};
export default highlightButton;
