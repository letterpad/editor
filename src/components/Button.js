import React from "react";
import classnames from "classnames";

const Button = ({ onMouseDown, isActive, icon }) => {
    const classes = classnames("button", {
        active: isActive
    });
    return (
        <span className={classes} onMouseDown={onMouseDown}>
            <span className="material-icons">{icon}</span>
        </span>
    );
};

export default Button;
