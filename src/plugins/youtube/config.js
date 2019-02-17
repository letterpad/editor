import React from "react";
import YoutubeButton from "./YoutubeButton";
import YoutubeNode from "./YoutubeNode";
import { YoutubePlugin } from ".";

export default [
    {
        type: "block",
        tag: "node",
        menuButtons: [],
        toolbarButtons: [<YoutubeButton />],
        render: YoutubeNode,
        identifier: ["iframe"],
        main: YoutubePlugin,
        markdown: {
            trigger: "]",
            before: /(\[youtube=?.*)/,
            change: (change, event, matches) => {
                const src = matches.before[0].replace("[youtube=", "");
                return change
                    .setBlocks({ type: "iframe", data: { src: src } })
                    .moveToEndOfBlock()
                    .insertBlock("paragraph");
            }
        }
    }
];
