import React from "react";
import { insertLinkStrategy, hasLinks } from "./LinkUtils";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";

const LinkButton: EditorButtonComponent = ({ editor }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={hasLinks(editor.value)}
      icon="insert_link"
      onMouseUp={e => {
        e.preventDefault();
        return insertLinkStrategy(editor, "code");
      }}
    />
  );
};

export default LinkButton;
