import React from "react";
import { addPlaceholder } from "./modifiers";

const EmbedButton = ({ setEditorState, getEditorState, children }) => {
  //
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditorState(addPlaceholder(getEditorState(), {}));
  };

  const onMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  // const className = isCurrentBlockType(getEditorState(), EditorBlockTypes)
  //   ? unionClassNames(theme.button, theme.active)
  //   : "";

  return (
    <span onMouseDown={onMouseDown}>
      <span onClick={onClick}>{children}</span>
    </span>
  );
};

export default EmbedButton;
