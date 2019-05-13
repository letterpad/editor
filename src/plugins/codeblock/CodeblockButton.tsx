import React from "react";
import { applyCodeblock } from "./CodeblockUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const codeblockButton: EditorButtonComponent = ({ editor, callbacks }) => (
  <Button
    isActive={hasBlock((editor as any).value, "u")}
    icon="code"
    onMouseDown={e => {
      const hookCalled = callbacks.onButtonClick(
        e,
        "plugin-codeblock",
        callbacks
      );
      if (hookCalled) return;
      return applyCodeblock(editor);
    }}
  />
);

export default codeblockButton;
