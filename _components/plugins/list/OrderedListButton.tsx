import React from "react";
import { orderedListStrategy, isOrderedList } from "./ListUtils";
import Button from "../../_components/Button";
import { EditorButtonComponent } from "..";

const OrderedListButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={isOrderedList(editor.value)}
      icon={"format_list_numbered"}
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(e, "plugin-li", callbacks);
        if (hookCalled) return;
        e.preventDefault();
        return orderedListStrategy(editor);
      }}
    />
  );
};
export default OrderedListButton;
