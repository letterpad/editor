import React from "react";
import { addPlaceholder } from "./modifiers";

const EmbedButton = ({ setEditorState, getEditorState }) => {
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
    <div onMouseDown={onMouseDown}>
      <button onClick={onClick} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 30 30"
          enableBackground="new 0 0 30 30"
          className="svgIcon"
          height="24"
          width="24"
        >
          <polygon points="30,13.917 19,7 19,10 27,15 19,20 19,23 30,15.959" />
          <polygon points="0,13.917 11,7 11,10 3,15 11,20 11,23 0,15.958" />
        </svg>
      </button>
    </div>
  );
};

export default EmbedButton;
