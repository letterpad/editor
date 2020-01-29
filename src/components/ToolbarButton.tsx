import React, { MouseEventHandler, SFC } from "react";

import classnames from "classnames";
import styled from "styled-components";

const Wrapper = styled.span<any>`
  &.active {
    color: var(--bg-success);
  }
  ${(p: any) => p.styleString}
  .material-icons {
    padding: 3px;
    font-size: 18px;
  }
  z-index: 999;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const TextIcon = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 3px;
  font-family: sans-serif;
  display: inline-block;
`;

interface ButtonProps {
  onMouseDown: MouseEventHandler;
  active?: boolean;
}

const ToolbarButton: SFC<ButtonProps> = ({ onMouseDown, active, children }) => {
  const classes = classnames("button", {
    active
  });
  return (
    <Wrapper className={classes} onMouseDown={onMouseDown}>
      {children}
    </Wrapper>
  );
};

export default ToolbarButton;

export const IconText: React.FC<{ text: any }> = ({ text }) => {
  return <TextIcon className="lp-text-icon">{text}</TextIcon>;
};

export const Icon: React.FC<{ icon: string }> = ({ icon }) => {
  return <span className="material-icons">{icon}</span>;
};