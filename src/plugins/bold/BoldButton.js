import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import Button from "../../components/Button";

const BoldButton = ({ editor, callbacks }) => {
    if (!editor) return <span />;
    return (
        <Button
            isActive={isMarkActive(editor.value, "strong")}
            icon="format_bold"
            onMouseDown={e => {
                callbacks.onButtonClick(e, "strong");
                e.preventDefault();
                return applyMarkStrategy(editor, "strong");
            }}
        />
    );
};
export default BoldButton;
