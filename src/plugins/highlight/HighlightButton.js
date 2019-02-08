import React from "react";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const highlightButton = ({ editor, style, type }) => {
    if (!editor.current) return <span />;
    const active = isMarkActive(editor.current.value, "highlight");
    return (
        <span
            style={style}
            className={"button " + (active ? "active" : "")}
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor.current, "highlight");
            }}
        >
            <span className="material-icons">border_color</span>
        </span>
    );
};
export default highlightButton;
