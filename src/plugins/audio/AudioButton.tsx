import React from "react";
import { applyAudio } from "./AudioUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";
import AudioInput from "./AudioInput";

const AudioButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;
  const type = "audio";

  return (
    <Button
      isActive={hasBlock(editor.value, type)}
      icon="queue_music"
      onMouseDown={e => {
        if (callbacks.showPlaceholder) {
          callbacks.showPlaceholder(AudioInput);
        }
        console.log(applyAudio, e);
        // const src: any = window.prompt("Enter the URL of the audio:");
        // const isActive = hasBlock(editor.value, type);
        // return applyAudio(editor, isActive ? "paragraph" : type, src);
      }}
    />
  );
};
export default AudioButton;
