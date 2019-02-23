import React from "react";
import { applyHeadings } from "./HeadingsUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";

const HeadingsButton: EditorButtonComponent = ({ editor, type }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={hasBlock(editor.value, type)}
      icon={getType(type)}
      onMouseUp={e => {
        e.preventDefault();
        const isActive = hasBlock(editor.value, type);
        return applyHeadings(editor, isActive ? "paragraph" : type);
      }}
    />
  );
};

const getType = (type: string) => {
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
  return;
};
export default HeadingsButton;
