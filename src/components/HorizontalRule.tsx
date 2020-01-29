import React from "react";
import { SlateNodeProps } from "../types";
import styled from "styled-components";

function HorizontalRule(props: SlateNodeProps) {
  const { isSelected, attributes } = props;
  return <StyledHr isSelected={isSelected} {...attributes} />;
}

const StyledHr = styled.hr<any>`
  padding-top: 0.75em;
  margin: 0;
  border: 0;
  border-bottom: 1px solid
    ${props => (props.isSelected ? "var(--bg-success)" : "var(--color-border)")};
`;

export default HorizontalRule;
