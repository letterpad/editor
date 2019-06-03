import React from "react";
import { applyLinebreak } from "./LinebreakUtils";
import Button from "../../components/Button";

const LinebreakButton = ({ editor, callbacks }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={false}
      icon="more_horiz"
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(
          e,
          "plugin-linebreak",
          callbacks
        );
        if (hookCalled) return;
        e.preventDefault();
        return applyLinebreak(editor, "hr");
      }}
    />
  );
};
export default LinebreakButton;
