import React from "react";
import Button from "../../_components/Button";
import { EditorButtonComponent } from "..";
import ImageInput from "./GiphyInput";

const ImageButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={false}
      iconText="gif"
      onMouseDown={e => {
        e.preventDefault();
        // check if the user wants to handle this
        const hookCalled = callbacks.onButtonClick(
          e,
          "plugin-giphy",
          callbacks
        );
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
