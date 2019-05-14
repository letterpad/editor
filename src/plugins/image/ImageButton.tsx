import React from "react";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";
import ImageInput from "./ImageInput";

const ImageButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={false}
      icon="image"
      onMouseDown={e => {
        // check if the user wants to handle this
        const hookCalled = callbacks.onButtonClick(
          e,
          "plugin-image",
          callbacks
        );
        if (hookCalled) {
          return;
        }
        e.preventDefault();
        callbacks.showPlaceholder(ImageInput);
      }}
    />
  );
};

export default ImageButton;
