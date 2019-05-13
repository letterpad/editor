import React from "react";
import { applyHeadings } from "./HeadingsUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";

const HeadingsButton: EditorButtonComponent = ({ editor, type, callbacks }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={hasBlock((editor as any).value, type)}
      icon={getType(type)}
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
      return "looks_one";
    case "h2":
      return "looks_two";
    case "h3":
      return "looks_3";
    case "h4":
      return "looks_4";
    case "h5":
      return "looks_5";
    case "h6":
      return "looks_6";
  }
  return "looks_3";
};
export default HeadingsButton;
