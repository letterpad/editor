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

const applyParallax = (props: any) => {
  return `
    ${applyStyles("full")}
    background: url(${props.src});
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    img {
      opacity: 0;
    }
  `;
};

export const Figure = styled.figure`
  ${(props: any) => applyStyles(props.type)}
  position: relative;
  z-index: 1;
`;

export const Wrapper = styled.div`
  ${(props: any) => applyStyles(props.type)}
  position: relative;
  z-index: 1;
  ${(props: any) => props.type === "parallax" && applyParallax(props)}
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

export const Row = styled.div`
  display: flex;
`;
