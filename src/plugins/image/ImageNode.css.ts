import styled from "styled-components";

const applyStyles = (type: string) => {
  switch (type) {
    case "left": {
      return `
        left: -100px;
        max-width: 400px;
        display: inline-block;
        float: left;

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
        left: -100px;
        width: calc(100% + 200px);
      `;
    }
    case "full": {
      return `
        width: 100vw;
        left: calc(-1.5 * var(--editorPadding) );
        @media screen and (min-width: 740px) {
          left: calc((-100vw + 100%) / 2);
        }
    `;
    }
  }
};

export const NodeWrapper = styled.p`
  ${(props: any) => applyStyles(props.type)}
  position: relative;
  z-index: 1;
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

export const StyledCaption = styled.figcaption`
  text-align: center;
  font-size: 12px;
  margin-top: 4px;
  color: #888;
  font-style: italic;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const Figure = styled.figure`
  ${(props: any) => applyStyles(props.type)}
  position: relative;
  z-index: 1;
  padding: 2px !important;
  display: inline-block;
  width: ${(p: any) => p.width};
  /* background: url(${(p: any) => p.src});
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid #fff; */
`;

export const Row = styled.div`
  display: flex;
`;
