import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import { MARK_TAGS } from "../../helper/constants";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const ItalicButton = ({ style, type, editor }) => {
    if (!editor.current) return <span />;
    const active = isMarkActive(editor.current.value, MARK_TAGS.em);
    return (
        <span
            style={style}
            className={"button " + (active ? "active" : "")}
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor.current, MARK_TAGS.em);
            }}
        >
            <span className="material-icons">format_italic</span>
        </span>
    );
};
export default ItalicButton;
