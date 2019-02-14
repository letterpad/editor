import React from "react";
import CodeblockButton from "./CodeblockButton";
import CodeblockNode from "./CodeblockNode";
import { CodeblockPlugin } from ".";
import { decorateNode } from "./CodeblockUtils";

export default [
    {
        type: "block",
        tag: "node",
        menuButtons: [<CodeblockButton />],
        toolbarButtons: [],
        decorator: decorateNode,
        render: props => {
            return <CodeblockNode {...props} />;
        },
        identifier: ["pre"],
        main: CodeblockPlugin
    },
    {
        type: "mark",
        tag: "mark",
        menuButtons: [],
        toolbarButtons: [],
        render: ({ next, ...props }) => {
            const { attributes, children, mark } = props;
            const className = "prism-token token " + mark.type;

            switch (props.mark.type) {
                case "comment":
                    return (
                        <span
                            {...attributes}
                            className={className}
                            style={{ opacity: "0.33" }}
                        >
                            {children}
                        </span>
                    );
                case "keyword":
                    return (
                        <span
                            {...attributes}
                            className={className}
                            style={{ fontWeight: "bold" }}
                        >
                            {children}
                        </span>
                    );
                case "tag":
                    return (
                        <span
                            {...attributes}
                            className={className}
                            style={{ fontWeight: "bold" }}
                        >
                            {children}
                        </span>
                    );
                case "punctuation":
                    return (
                        <span
                            {...attributes}
                            className={className}
                            style={{ opacity: "0.75" }}
                        >
                            {children}
                        </span>
                    );
            }
            return null;
        },
        identifier: ["comment", "keyword", "puntuation", "tag", "constant"]
    }
];
