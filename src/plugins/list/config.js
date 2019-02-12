import React from "react";
import { ListPlugin, OrderedListNode } from ".";
import ListButtonBar from "./ListButtonBar";
import UnorderedListNode from "./UnorderedListNode";
import ListItemNode from "./ListItemNode";

export default {
    type: "block",
    tag: "node",
    menuButtons: [<ListButtonBar />],
    toolbarButtons: [],
    render: props => {
        if (props.node.type === "unordered-list") {
            return <UnorderedListNode {...props} />;
        } else if (props.node.type === "ordered-list") {
            return <OrderedListNode {...props} />;
        } else if (props.node.type === "list-item") {
            return <ListItemNode {...props} />;
        }
    },
    identifier: [
        ["li", "list-item"],
        ["ol", "ordered-list"],
        ["ul", "unordered-list"]
    ],
    main: ListPlugin
};
