import React from "react";
import { BoldButton, BoldPlugin } from ".";
import BoldMark from "./BoldMark";

export default {
    type: "mark",
    menuButtons: [<BoldButton />],
    toolbarButtons: [],
    render: BoldMark,
    main: BoldPlugin
};
