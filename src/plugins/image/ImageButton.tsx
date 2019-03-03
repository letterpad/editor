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
        e.preventDefault();
        // check if the user wants to handle this
        const hookCalled = callbacks.onButtonClick(e, "img", callbacks);
        if (hookCalled) {
          return;
        }

        if (callbacks.showPlaceholder) {
          callbacks.showPlaceholder(ImageInput);
        }
      }}
    />
  );
};

export default ImageButton;
