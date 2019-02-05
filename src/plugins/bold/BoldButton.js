import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import { MARK_TAGS } from "../../helper/constants";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const BoldButton = ({ style, type, editor }) => {
    if (!editor.current) return <span />;
    const active = isMarkActive(editor.current.value, MARK_TAGS.strong);
    return (
        <span
            style={style}
            className={"button " + (active ? "active" : "")}
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor.current, MARK_TAGS.strong);
            }}
        >
            <span className="material-icons">format_bold</span>
        </span>
    );
};
export default BoldButton;
