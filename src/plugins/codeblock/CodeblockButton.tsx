import React from "react";
import { applyCodeblock } from "./CodeblockUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const codeblockButton = ({ editor }) => (
    <Button
        isActive={hasBlock(editor.value, "u")}
        icon="code"
        onMouseDown={e => {
            return applyCodeblock(editor);
        }}
    />
);

export default codeblockButton;
