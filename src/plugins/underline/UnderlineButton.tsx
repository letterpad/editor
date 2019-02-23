import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import Button from "../../components/Button";
import { Editor } from "slate";

const UnderlineButton = ({
  editor,
  callbacks
}: {
  editor: Editor;
  callbacks: { [key: string]: (...args: any[]) => any };
}) => {
  if (!editor) return <span />;

  const type = "u";

  return (
    <Button
      isActive={isMarkActive(editor.value, type)}
      icon="format_underline"
      onMouseUp={e => {
        callbacks.onButtonClick(e, type);
        e.preventDefault();
        return applyMarkStrategy(editor, type);
      }}
    />
  );
};
export default UnderlineButton;
