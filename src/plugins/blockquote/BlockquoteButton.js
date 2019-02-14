import React from "react";
import { applyBlockquote } from "./BlockquoteUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";

const BlockquoteButton = ({ editor }) => {
    if (!editor) return <span />;
    const type = "block-quote";

    return (
        <Button
            isActive={hasBlock(editor.value, type)}
            icon="format_quote"
            onMouseDown={e => {
                const isActive = hasBlock(editor.value, type);
                return applyBlockquote(editor, isActive ? "paragraph" : type);
            }}
        />
    );
};
export default BlockquoteButton;
