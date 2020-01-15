import React from "react";
import { unorderedListStrategy, isUnorderedList } from "./ListUtils";
import Button from "../../_components/Button";
import { EditorButtonComponent } from "..";

const UnorderedListButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;
  return (
    <Button
      isActive={isUnorderedList(editor.value)}
      icon={"format_list_bulleted"}
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(e, "plugin-ul", callbacks);
        if (hookCalled) return;
        e.preventDefault();
        return unorderedListStrategy(editor);
      }}
    />
  );
};
export default UnorderedListButton;
