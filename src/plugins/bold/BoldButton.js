import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import Button from "../../components/Button";

const BoldButton = ({ editor }) => {
    if (!editor) return <span />;
    return (
        <Button
            isActive={isMarkActive(editor.value, "strong")}
            icon="format_bold"
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor, "strong");
            }}
        />
    );
};
export default BoldButton;
