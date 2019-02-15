import React from "react";
import BlockquoteButton from "./BlockquoteButton";
import BlockquoteNode from "./BlockquoteNode";
import { BlockquotePlugin } from ".";

export default {
    type: "block",
    tag: "node",
    menuButtons: [<BlockquoteButton />],
    toolbarButtons: [],
    render: BlockquoteNode,
    identifier: ["blockquote"],
    main: BlockquotePlugin,
    markdown: {
        trigger: "space",
        before: /^(>)$/,
        change: change => change.setBlocks("blockquote")
    }
};
