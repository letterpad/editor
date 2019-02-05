import React from "react";
import classnames from "classnames";
import { applyBlockquote } from "./BlockquoteUtils";
import { hasBlock } from "../../helper/strategy";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const BlockquoteButton = ({ editor, onChange, changeState, style }) => {
    if (!editor.current) return <span />;
    const type = "block-quote";
    return (
        <span
            style={style}
            className={classnames("button", {
                active: hasBlock(editor.current.value, type)
            })}
            type={type}
            onMouseDown={e => {
                // e.preventDefault();
                // check if this is already active
                const isActive = hasBlock(editor.current.value, type);
                return applyBlockquote(
                    editor.current,
                    isActive ? "paragraph" : type
                );
            }}
        >
            <span className="material-icons">format_quote</span>
        </span>
    );
};
export default BlockquoteButton;
