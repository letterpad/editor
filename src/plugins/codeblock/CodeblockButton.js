import React from "react";
import { applyCodeblock } from "./CodeblockUtils";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const codeblockButton = ({ editor, style, type, node }) => (
    <span
        style={style}
        className="button"
        type={type}
        onMouseDown={e => {
            return applyCodeblock(editor);
        }}
    >
        <span className="material-icons">code</span>
    </span>
);

export default codeblockButton;
