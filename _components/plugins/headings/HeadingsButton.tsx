import React from "react";
import { applyHeadings } from "./HeadingsUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../_components/Button";
import { EditorButtonComponent } from "..";

const HeadingsButton: EditorButtonComponent = ({ editor, type, callbacks }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={hasBlock((editor as any).value, type)}
      iconText={getType(type)}
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(
          e,
          "plugin-headings",
          callbacks
        );
        if (hookCalled) return;
        e.preventDefault();
        const isActive = hasBlock((editor as any).value, type);
        return applyHeadings(editor, isActive ? "p" : type);
      }}
    />
  );
};

const getType = (type: any) => {
  switch (type) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
  }
  return "h3";
};
export default HeadingsButton;
