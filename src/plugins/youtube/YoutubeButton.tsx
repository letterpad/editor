import React from "react";
import { applyYoutube } from "./YoutubeUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";
import { Editor } from "slate";

const YoutubeButton = ({
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
      icon="queue_music"
      onMouseUp={e => {
        callbacks.onButtonClick(e, type);
        e.preventDefault();
        const src = window.prompt("Enter the URL of the Youtube:");
        const isActive = hasBlock(editor.value, type);
        return applyYoutube(editor, isActive ? "paragraph" : type, src);
      }}
    />
  );
};
export default YoutubeButton;
