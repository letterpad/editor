import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import { MARK_TAGS } from "../../helper/constants";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const UnderlineButton = ({ style, type, editor }) => {
    if (!editor) return <span />;
    const active = isMarkActive(editor.value, "u");
    return (
        <span
            style={style}
            className={"button " + (active ? "active" : "")}
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor, "u");
            }}
        >
            <span className="material-icons">format_underline</span>
        </span>
    );
};
export default UnderlineButton;
