import React from "react";
import { LinebreakButton, LinebreakPlugin } from ".";
import LinebreakNode from "./LinebreakNode";

export default {
    type: "node",
    menuButtons: [],
    toolbarButtons: [<LinebreakButton />],
    render: LinebreakNode,
    main: LinebreakPlugin
};
