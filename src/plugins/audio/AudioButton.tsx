import React from "react";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";
import AudioInput from "./AudioInput";

const AudioButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;
  const type = "audio";

  return (
    <Button
      isActive={hasBlock((editor as any).value, type)}
      icon="queue_music"
      onMouseDown={() => {
        if (callbacks.showPlaceholder) {
          callbacks.showPlaceholder(AudioInput);
        }
      }}
    />
  );
};
export default AudioButton;
