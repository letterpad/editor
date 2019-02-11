import React from "react";
import { ItalicButton, ItalicPlugin } from ".";
import ItalicMark from "./ItalicMark";

export default {
    type: "mark",
    menuButtons: [<ItalicButton />],
    toolbarButtons: [],
    render: ItalicMark,
    main: ItalicPlugin
};
