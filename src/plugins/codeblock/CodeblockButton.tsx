import React from "react";
import { applyCodeblock } from "./CodeblockUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const codeblockButton: EditorButtonComponent = ({ editor }) => (
  <Button
    isActive={hasBlock((editor as any).value, "u")}
    icon="code"
    onMouseDown={() => {
      return applyCodeblock(editor);
    }}
  />
);

export default codeblockButton;
