import React from "react";
import { applyLinebreak } from "./LinebreakUtils";
import Button from "../../components/Button";

const LinebreakButton = ({ editor }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={false}
      icon="more_horiz"
      onMouseDown={e => {
        e.preventDefault();
        return applyLinebreak(editor, "hr");
      }}
    />
  );
};
export default LinebreakButton;
