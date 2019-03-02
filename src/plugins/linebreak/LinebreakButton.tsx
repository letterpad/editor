import React from "react";
import { applyLinebreak } from "./LinebreakUtils";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";

const LinebreakButton: EditorButtonComponent = ({ editor, onClick }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={false}
      icon="more_horiz"
      onMouseDown={e => {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        }
        return applyLinebreak(editor, "hr");
      }}
    />
  );
};
export default LinebreakButton;
