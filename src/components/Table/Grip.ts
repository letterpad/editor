// @flow
import styled from "styled-components";

const Grip = styled.a<any>`
  position: absolute;
  cursor: pointer;
  background: ${props =>
    props.isSelected ? props.theme.tableSelected : props.theme.tableDivider};

  ${props => props.isSelected && "opacity: 1 !important;"}

  &:hover {
    background: ${props =>
      props.isSelected
        ? props.theme.tableSelected
        : props.theme.toolbarBackground};
  }
`;

export default Grip;
