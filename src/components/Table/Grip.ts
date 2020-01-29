import styled from "styled-components";

const Grip = styled.a<any>`
  position: absolute;
  cursor: pointer;
  background: ${props =>
    props.isSelected ? "var(--bg-hover-success)" : "var(--bg-hover-success)"};

  ${props => props.isSelected && "opacity: 1 !important;"}

  &:hover {
    background: ${props =>
      props.isSelected ? "var(--bg-hover-success)" : "var(--bg-hover-success)"};
  }
`;

export default Grip;
