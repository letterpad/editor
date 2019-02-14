import React from "react";
import { isMarkActive, applyMarkStrategy } from "../../helper/strategy";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const highlightButton = ({ editor, style, type }) => {
    if (!editor) return <span />;
    const active = isMarkActive(editor.value, "code");
    return (
        <span
            style={style}
            className={"button " + (active ? "active" : "")}
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor, "code");
            }}
        >
            <span className="material-icons">border_color</span>
        </span>
    );
};
export default highlightButton;
