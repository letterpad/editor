import React from "react";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { Editor } from "slate";
import VideoInput from "./VideoInput";

const VideoButton = ({
  editor,
  callbacks
}: {
  editor: Editor;
  callbacks: { [key: string]: (...args: any[]) => any };
}) => {
  if (!editor) return <span />;

  const type = "iframe";

  return (
    <Button
      isActive={hasBlock(editor.value, type)}
      icon="music_video"
      onMouseDown={_ => {
        if (callbacks.showPlaceholder) {
          callbacks.showPlaceholder(VideoInput);
        }
      }}
    />
  );
};
export default VideoButton;
