import React from "react";
import LinkButton from "./LinkButton";
import LinkNode from "./LinkNode";
import { LinkPlugin } from ".";

export default {
    type: "inline",
    tag: "node",
    menuButtons: [<LinkButton />],
    toolbarButtons: [],
    render: LinkNode,
    identifier: ["a"],
    main: LinkPlugin
};
