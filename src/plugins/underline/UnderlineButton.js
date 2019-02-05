import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import { MARK_TAGS } from "../../helper/constants";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const UnderlineButton = ({ style, type, editor }) => {
    if (!editor.current) return <span />;
    const active = isMarkActive(editor.current.value, MARK_TAGS.u);
    return (
        <span
            style={style}
            className={"button " + (active ? "active" : "")}
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor.current, MARK_TAGS.u);
            }}
        >
            <span className="material-icons">format_underline</span>
        </span>
    );
};
export default UnderlineButton;
