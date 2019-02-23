import React from "react";
import { unorderedListStrategy, isUnorderedList } from "./ListUtils";
import Button from "../../components/Button";
import { Editor } from "slate";

const UnorderedListButton = ({ editor }: { editor: Editor }) => {
  if (!editor) return <span />;
  return (
    <Button
      isActive={isUnorderedList(editor.value)}
      icon={"format_list_bulleted"}
      onMouseUp={e => {
        e.preventDefault();
        return unorderedListStrategy(editor);
      }}
    />
  );
};
export default UnorderedListButton;
