import React, { SFC, MouseEventHandler } from "react";
import classnames from "classnames";

interface ButtonProps {
  onMouseDown: MouseEventHandler;
  icon?: string;
  isActive?: boolean;
}

const Button: SFC<ButtonProps> = ({ onMouseDown, isActive, icon }) => {
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
