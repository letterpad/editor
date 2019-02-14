import React from "react";
import { applyMarkStrategy, isMarkActive } from "../../helper/strategy";
import Button from "../../components/Button";

const UnderlineButton = ({ editor }) => {
    if (!editor) return <span />;

    return (
        <Button
            isActive={isMarkActive(editor.value, "u")}
            icon="format_underline"
            onMouseDown={e => {
                e.preventDefault();
                return applyMarkStrategy(editor, "u");
            }}
        />
    );
};
export default UnderlineButton;
