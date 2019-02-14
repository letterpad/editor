import React from "react";
import { ItalicButton, ItalicPlugin } from ".";
import ItalicMark from "./ItalicMark";

export default {
    type: "mark",
    tag: "mark",
    menuButtons: [<ItalicButton />],
    toolbarButtons: [],
    render: ItalicMark,
    identifier: ["em"],
    main: ItalicPlugin
};
