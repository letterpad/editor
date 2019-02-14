import React from "react";
import { orderedListStrategy, isOrderedList } from "./ListUtils";
import Button from "../../components/Button";

const OrderedListButton = ({ editor }) => {
    if (!editor) return <span />;

    return (
        <Button
            isActive={isOrderedList(editor.value)}
            icon={"format_list_numbered"}
            onMouseDown={e => {
                e.preventDefault();
                return orderedListStrategy(editor, "ordered-list");
            }}
        />
    );
};
export default OrderedListButton;
