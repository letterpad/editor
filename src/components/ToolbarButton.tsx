import React, { MouseEventHandler, SFC } from "react";

import { Editor } from "slate";
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
  img {
    width: 18px;
  }
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
  editor: Editor;
  tooltip: string;
}

const ToolbarButton: SFC<ButtonProps> = ({
  onMouseDown,
  active,
  children,
  tooltip,
  editor
}) => {
  const classes = classnames("button", {
    active
  });
  const Tooltip = editor.props.tooltip;
  return (
    <Wrapper className={classes} onMouseDown={onMouseDown}>
      <Tooltip tooltip={tooltip} placement="top">
        {children}
      </Tooltip>
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
