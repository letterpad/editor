import * as React from "react";

import { SlateNodeProps } from "../../types";
import styled from "styled-components";

const StyledTr = styled.tr<any>`
  position: relative;
  border-bottom: 1px solid var(--color-border);
`;

const Row = ({ children, attributes }: SlateNodeProps) => {
  return <StyledTr {...attributes}>{children}</StyledTr>;
};

export default Row;
