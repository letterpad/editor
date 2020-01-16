import React, { SFC } from "react";
import styled from "styled-components";

const StyledCode = styled.code`
  background: var(--bg-success);
  color: var(--bg-base);
  font-size: large;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: inherit;
`;
/* eslint-disable react/prop-types */
const highlightMark: SFC = ({ children }) => {
  return <StyledCode data-id="plugin-highlight">{children}</StyledCode>;
};

export default highlightMark;