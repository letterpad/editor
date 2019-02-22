import React, { SFC, MouseEventHandler } from "react";
import classnames from "classnames";

interface ButtonProps {
  onMouseUp: MouseEventHandler;
  icon: string;
  isActive?: boolean;
}

const Button: SFC<ButtonProps> = ({ onMouseUp, isActive, icon }) => {
  const classes = classnames("button", {
    active: isActive
  });
  return (
    <span className={classes} onMouseUp={onMouseUp}>
      <span className="material-icons">{icon}</span>
    </span>
  );
};

export default Button;
