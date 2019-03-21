import React from "react";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";
import ImageInput from "./ImageInput";

const styleString = `
width: 37px;
height: 27px;
display: inline-block;
span {
  width: 32px;
  height: 32px;
  display: block;
  border: 1px solid var(--color-base);
  color: #000;
}
.custom-icons {
  background-image: url(https://36711.apps.zdusercontent.com/36711/assets/1506469900-fd7a54462c6615af92812b8a1a25884b/logo.png);
  background-size: 18px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
}
`;
const ImageButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;

  return (
    <Button
      isActive={false}
      styleString={styleString}
      icon="https://36711.apps.zdusercontent.com/36711/assets/1506469900-fd7a54462c6615af92812b8a1a25884b/logo.png"
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
