/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import classnames from "classnames";

import { insertLinkStrategy, hasLinks } from "./LinkUtils";

const LinkButton = ({ editor, className, style, type }) => {
    if (!editor.current) return <span />;
    return (
        <span
            style={style}
            type={type}
            onMouseDown={e => {
                e.preventDefault();
                return insertLinkStrategy(editor.current);
            }}
            className={classnames(
                "button",
                { active: hasLinks(editor.current.value) },
                className
            )}
        >
            <span className="material-icons">insert_link</span>
        </span>
    );
};

export default LinkButton;
