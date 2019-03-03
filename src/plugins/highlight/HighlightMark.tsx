import React, { SFC } from "react";
import styled from "styled-components";

const StyledCode = styled.code`
  background: #bbf7b8;
  font-size: large;
  padding: 2px 4px;
  border-radius: 4px;
`;
/* eslint-disable react/prop-types */
const highlightMark: SFC = ({ children }) => {
  return <StyledCode>{children}</StyledCode>;
};

export default highlightMark;
