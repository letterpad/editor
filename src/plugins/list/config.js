import React from "react";
import { ListPlugin, OrderedListButton, UnorderedListButton } from ".";
import ListButtonBar from "./ListButtonBar";
// import LinebreakNode from "./LinebreakNode";

export default {
    type: "node",
    menuButtons: [<ListButtonBar />],
    toolbarButtons: [],
    render: props => {
        //LinebreakNode
        console.log("props :", props);
    },
    main: ListPlugin
};
