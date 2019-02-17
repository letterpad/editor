import React from "react";
import { applyAudio } from "./AudioUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";

const AudioButton = ({ editor }) => {
    if (!editor) return <span />;
    const type = "audio";

    return (
        <Button
            isActive={hasBlock(editor.value, type)}
            icon="queue_music"
            onMouseDown={e => {
                const src = window.prompt("Enter the URL of the audio:");
                const isActive = hasBlock(editor.value, type);
                return applyAudio(editor, isActive ? "paragraph" : type, src);
            }}
        />
    );
};
export default AudioButton;
