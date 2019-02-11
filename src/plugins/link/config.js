import React from "react";
import LinkButton from "./LinkButton";
import LinkNode from "./LinkNode";
import { LinkPlugin } from ".";

export default {
    type: "node",
    menuButtons: [<LinkButton />],
    toolbarButtons: [],
    render: LinkNode,
    main: LinkPlugin
};
