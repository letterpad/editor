import React from "react";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { Editor } from "slate";
import VideoInput from "./EmbedInput";

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
      isActive={hasBlock((editor as any).value, type)}
      icon="code"
      onMouseDown={e => {
        const hookCalled = callbacks.onButtonClick(
          e,
          "plugin-embed",
          callbacks
        );
        if (hookCalled) return;
        if (callbacks.showPlaceholder) {
          callbacks.showPlaceholder(VideoInput);
        }
      }}
    />
  );
};
export default VideoButton;
