import React from "react";
import { LinebreakButton, LinebreakPlugin } from ".";
import LinebreakNode from "./LinebreakNode";

export default {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [<LinebreakButton />],
    render: LinebreakNode,
    identifier: [["hr", "line-break"]],
    main: LinebreakPlugin
};
