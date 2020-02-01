import React from "react";
import { SlateNodeProps } from "../types";
import styled from "styled-components";

function HorizontalRule(props: SlateNodeProps) {
  const { isSelected, attributes } = props;
  return <StyledHr isSelected={isSelected} {...attributes} className="lp-hr" />;
}

const StyledHr = styled.hr<any>`
  border-top: 1px solid
    ${props => (props.isSelected ? "var(--bg-success)" : "inherit")};
`;

export default HorizontalRule;
