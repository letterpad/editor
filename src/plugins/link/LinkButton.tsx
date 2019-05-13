import React from "react";
import { insertLinkStrategy, hasLinks } from "./LinkUtils";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";

const LinkButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={hasLinks(editor.value)}
      icon="insert_link"
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(e, "plugin-link", callbacks);
        if (hookCalled) return;
        e.preventDefault();
        return insertLinkStrategy(editor);
      }}
    />
  );
};

export default LinkButton;
