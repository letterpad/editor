import React, { SFC } from "react";
import styled from "styled-components";

const StyledCode = styled.code`
  background: #fbff8f;
  font-size: large;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: inherit;
`;
/* eslint-disable react/prop-types */
const highlightMark: SFC = ({ children }) => {
  return <StyledCode>{children}</StyledCode>;
};

export default highlightMark;
