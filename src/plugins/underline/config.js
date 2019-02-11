import React from "react";
import { UnderlineButton, UnderlinePlugin } from ".";
import UnderlineMark from "./UnderlineMark";

export default {
    type: "mark",
    menuButtons: [<UnderlineButton />],
    toolbarButtons: [],
    render: UnderlineMark,
    main: UnderlinePlugin
};
