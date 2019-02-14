import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import Button from "../../components/Button";

const ItalicButton = ({ editor }) => {
    if (!editor) return <span />;
    return (
        <Button
            isActive={isMarkActive(editor.value, "em")}
            icon="format_italic"
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor, "em");
            }}
        />
    );
};
export default ItalicButton;
