import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const BoldButton = ({ style, type, editor }) => {
    if (!editor) return <span />;
    const active = isMarkActive(editor.value, "bold");
    return (
        <span
            style={style}
            className={"button " + (active ? "active" : "")}
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor, "bold");
            }}
        >
            <span className="material-icons">format_bold</span>
        </span>
    );
};
export default BoldButton;
