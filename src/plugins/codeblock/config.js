import React from "react";
import CodeblockButton from "./CodeblockButton";
import CodeblockNode from "./CodeblockNode";
import { CodeblockPlugin } from ".";
import { decorateNode } from "./CodeblockUtils";

export default {
    type: "node",
    menuButtons: [<CodeblockButton />],
    toolbarButtons: [],
    decorator: decorateNode,
    render: CodeblockNode,
    main: CodeblockPlugin
};
