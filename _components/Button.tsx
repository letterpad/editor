import React, { SFC, MouseEventHandler } from "react";
import classnames from "classnames";
import styled from "styled-components";

const Wrapper = styled.span`
  ${(p: any) => p.styleString}
`;
const TextIcon = styled.span`
  border-radius: 50%;
  border: 1px solid;
  font-size: 12px;
  font-weight: 600;
  width: 32px;
  height: 32px;
  vertical-align: text-bottom;
  margin-right: 6px;
  display: inline-block;
  padding: 3px;
  font-family: sans-serif;
  line-height: 25px;
`;

interface ButtonProps {
  onMouseDown: MouseEventHandler;
  icon?: string;
  isActive?: boolean;
  styleString?: string;
  iconText?: string;
}

const Button: SFC<ButtonProps> = ({
  onMouseDown,
  isActive,
  icon,
  iconText,
  styleString
}) => {
  const classes = classnames("button", {
    active: isActive
  });
  const isImageLink = icon && icon.indexOf(".") > 0;
  const isMaterial = !isImageLink && !iconText;
  return (
    <Wrapper
      styleString={styleString}
      className={classes}
      onMouseDown={onMouseDown}
      icon={icon}
    >
      {isImageLink && <span className="custom-icons" />}
      {iconText && <TextIcon className="lp-text-icon">{iconText}</TextIcon>}
      {isMaterial && <span className="material-icons">{icon}</span>}
    </Wrapper>
  );
};

export default Button;
