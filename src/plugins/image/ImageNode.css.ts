import styled from "styled-components";

const applyStyles = (type: string) => {
  switch (type) {
    case "left": {
      return `
          margin-left: -100px;
          max-width: 400px;
          display: inline-block;
          float: left;
          margin-right: 40px;
        `;
    }
    case "center": {
      return `
          margin-left: initial;
          max-width: 100%;
        `;
    }
    case "wide": {
      return `
          margin-left: -100px;
          max-width: calc(100% + 200px);
          margin-right: -300px;
        `;
    }
    case "full": {
      return `
          width: 100vw;
          left: -1rem;
          @media screen and (min-width: 740px) {
            left: calc((-100vw + 740px - 2rem) / 2);
          }
      `;
    }
  }
};

export const NodeWrapper = styled.section`
  ${(props: any) => applyStyles(props.type)}
  position: relative;
`;

export const StyledCaptionInput = styled.input`
  width: 100%;
  border: none;
  text-align: center;
  outline: none;
  font-size: 12px;
  font-family: inherit;
  color: #888;
`;

export const StyledCaption = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 4px;
  color: #888;
  font-style: italic;
`;
