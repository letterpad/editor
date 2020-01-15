import styled from "styled-components";

export const NodeWrapper = styled.section`
  position: relative;
  z-index: 1;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const addUnit = (value: any) => {
  if (typeof value === "number") {
    return value + "px";
  }
  return value;
};

export const Figure = styled.figure`
  position: relative;
  z-index: 1;
  cursor: pointer;
  padding: 2px !important;
  display: inline-block;
  height: ${(p: any) => addUnit(p.height)};
  width: ${(p: any) => addUnit(p.width)};
  background: url(${(p: any) => p.src});
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid var(--color-border);
  ${(p: any) =>
    p.selected && "border: 2px solid var(--color-success) !important"}
  -webkit-animation: fadeInImage 2s;
  animation: fadeInImage 1s;
  /* Chrome, Safari, Opera */
  @-webkit-keyframes fadeInImage {
    from {
      opacity: 0.2;
    }
    to {
      opacity: 1;
    }
  }

  /* Standard syntax */
  @keyframes fadeInImage {
    from {
      opacity: 0.2;
    }
    to {
      opacity: 1;
    }
  }

  transition: 0.3s opacity ease-in-out;
`;

export const Row = styled.div`
  display: flex;
`;

export const StyledButton = styled.button`
  position: absolute;
  margin-left: -24px;
  cursor: pointer;
  border: none;
  background: var(--bg-base);
  color: var(--base-shade-6);
`;
