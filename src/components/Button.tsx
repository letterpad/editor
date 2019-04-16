import React, { SFC, MouseEventHandler } from "react";
import classnames from "classnames";
import styled from "styled-components";

const Wrapper = styled.span`
  ${(p: any) => p.styleString}
`;
interface ButtonProps {
  onMouseDown: MouseEventHandler;
  icon: string;
  isActive?: boolean;
  styleString?: string;
}

const Button: SFC<ButtonProps> = ({
  onMouseDown,
  isActive,
  icon,
  styleString
}) => {
  const classes = classnames("button", {
    active: isActive
  });
  const isCustomIcon = icon.indexOf(".") > 0;
  return (
    <Wrapper
      styleString={styleString}
      className={classes}
      onMouseDown={onMouseDown}
      icon={icon}
    >
      {isCustomIcon ? (
        <span className="custom-icons" />
      ) : (
        <span className="material-icons">{icon}</span>
      )}
    </Wrapper>
  );
};

export default Button;
