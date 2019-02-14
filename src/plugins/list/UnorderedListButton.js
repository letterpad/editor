import React from "react";
import { unorderedListStrategy, isUnorderedList } from "./ListUtils";
import Button from "../../components/Button";

const UnorderedListButton = ({ editor }) => {
    if (!editor) return <span />;
    return (
        <Button
            isActive={isUnorderedList(editor.value)}
            icon={"format_list_bulleted"}
            onMouseDown={e => {
                e.preventDefault();
                return unorderedListStrategy(editor, "unordered-list");
            }}
        />
    );
};
export default UnorderedListButton;
