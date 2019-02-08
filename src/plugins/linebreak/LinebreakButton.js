import React from "react";
import { applyLinebreak } from "./LinebreakUtils";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const LinebreakButton = ({ editor, style, type }) => {
    if (!editor.current) return <span />;
    return (
        <span
            style={style}
            className="button"
            type={type}
            onMouseDown={e => {
                e.preventDefault();
                return applyLinebreak(editor.current, "line-break");
            }}
        >
            <span className="material-icons">more_horiz</span>
        </span>
    );
};
export default LinebreakButton;
