import React from "react";

import classnames from "classnames";

import { unorderedListStrategy, isUnorderedList } from "./ListUtils";
/* eslint-disable react/prop-types */
const UnorderedListButton = ({ editor, className, style, type }) => {
    if (!editor.current) return <span />;
    return (
        <span
            style={style}
            type={type}
            onMouseDown={() => unorderedListStrategy(editor.current)}
            className={classnames(
                "button slate-list-plugin--button",
                { active: isUnorderedList(editor.current.value) },
                className
            )}
        >
            <span className="material-icons">format_list_bulleted</span>
        </span>
    );
};
export default UnorderedListButton;
