import React from "react";
import { UnderlineButton, UnderlinePlugin } from ".";
import UnderlineMark from "./UnderlineMark";

export default {
    type: "mark",
    tag: "mark",
    menuButtons: [<UnderlineButton />],
    toolbarButtons: [],
    render: UnderlineMark,
    identifier: [["u", "underline"]],
    main: UnderlinePlugin
};
