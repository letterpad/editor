import React from "react";
import AudioButton from "./AudioButton";
import AudioNode from "./AudioNode";
import { AudioPlugin } from ".";

export default [
    {
        type: "block",
        tag: "node",
        menuButtons: [],
        toolbarButtons: [<AudioButton />],
        render: AudioNode,
        identifier: ["audio"],
        main: AudioPlugin,
        markdown: {
            trigger: "]",
            before: /(\[audio=?.*)/,
            change: (change, event, matches) => {
                const src = matches.before[0].replace("[audio=", "");
                return change
                    .setBlocks({ type: "audio", data: { src: src } })
                    .moveToEndOfBlock()
                    .insertBlock("paragraph");
            }
        }
    }
];
