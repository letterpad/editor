import React from "react";
import classnames from "classnames";
import { applyBlockquote } from "./BlockquoteUtils";
import { hasBlock } from "../../helper/strategy";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const BlockquoteButton = ({ editor, onChange, changeState, style }) => {
    if (!editor) return <span />;
    const type = "block-quote";
    return (
        <span
            style={style}
            className={classnames("button", {
                active: hasBlock(editor.value, type)
            })}
            type={type}
            onMouseDown={e => {
                // e.preventDefault();
                // check if this is already active
                const isActive = hasBlock(editor.value, type);
                return applyBlockquote(
                    editor,
                    isActive ? "paragraph" : type
                );
            }}
        >
            <span className="material-icons">format_quote</span>
        </span>
    );
};
export default BlockquoteButton;
