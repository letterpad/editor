import React from "react";
import { applyYoutube } from "./YoutubeUtils";
import { hasBlock } from "../../helper/strategy";
import Button from "../../components/Button";

const YoutubeButton = ({ editor }) => {
    if (!editor) return <span />;
    const type = "iframe";

    return (
        <Button
            isActive={hasBlock(editor.value, type)}
            icon="queue_music"
            onMouseDown={e => {
                const src = window.prompt("Enter the URL of the Youtube:");
                const isActive = hasBlock(editor.value, type);
                return applyYoutube(editor, isActive ? "paragraph" : type, src);
            }}
        />
    );
};
export default YoutubeButton;
