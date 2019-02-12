import React from "react";
import { BoldButton, BoldPlugin } from ".";
import BoldMark from "./BoldMark";

export default {
    type: "mark",
    tag: "mark",
    menuButtons: [<BoldButton />],
    toolbarButtons: [],
    render: BoldMark,
    identifier: [["strong", "bold"]],
    main: BoldPlugin
};
