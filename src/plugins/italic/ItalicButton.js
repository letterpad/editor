import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import { MARK_TAGS } from "../../helper/constants";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const ItalicButton = ({ style, type, editor }) => {
    if (!editor) return <span />;
    const active = isMarkActive(editor.value, "italic");
    return (
        <span
            style={style}
            className={"button " + (active ? "active" : "")}
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor, "italic");
            }}
        >
            <span className="material-icons">format_italic</span>
        </span>
    );
};
export default ItalicButton;
