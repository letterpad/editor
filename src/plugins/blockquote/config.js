import React from "react";
import BlockquoteButton from "./BlockquoteButton";
import BlockquoteNode from "./BlockquoteNode";
import { BlockquotePlugin } from ".";

export default {
    type: "node",
    menuButtons: [<BlockquoteButton />],
    toolbarButtons: [],
    render: BlockquoteNode,
    main: BlockquotePlugin
};
