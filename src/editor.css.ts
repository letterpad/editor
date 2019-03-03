import styled from "styled-components";

export const EditorWrapper = styled.div`
  & * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    /* remove defaults */
    margin: 0;
    padding: 0;
    border: 0;
  }

  width: ${({ width }: { width?: number }) => (width ? width : 740)}px;
  margin: auto;

  font-size: 1.1rem;
  font-weight: 200;
  font-style: normal;
  font-family: "Libre Baskerville", serif;
  text-rendering: optimizeLegibility;
  color: #000000;

  padding: 1rem;
  line-height: 2;

  h1,
  h2,
  h3,
  h4 {
    font-family: "Libre Franklin", sans-serif;
    text-rendering: optimizeLegibility;
    line-height: 1;
    padding-top: 2rem;
    padding-bottom: 1rem;
  }

  h1 {
    font-size: 4rem;
    color: #171717;
    border-bottom: solid 1px #171717;
  }

  h2,
  h3,
  h4 {
    color: #000000;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  p {
    padding: 0;
    padding-top: 2rem;
    padding-bottom: 1rem;
    text-align: justify;
  }

  h1 + p {
    padding-top: 1rem;
  }

  h2 + p,
  h3 + p,
  h4 + p {
    padding-top: 0.5rem;
  }

  h1 + h2,
  h2 + h3,
  h3 + h4 {
    padding-top: 1rem;
  }

  ul,
  ol {
    padding: 2rem;
    padding-top: 2rem;
    padding-bottom: 1rem;
  }

  hr {
    border: none !important;
    margin-top: 52px;
    margin-bottom: 42px;
    display: block;
    border: 0;
    text-align: center;
    overflow: visible;
    &:before {
      font-family: Georgia, Cambria, "Times New Roman", Times, serif;
      font-weight: 400;
      font-style: italic;
      font-size: 30px;
      letter-spacing: 0.6em;
      content: "...";
      display: inline-block;
      margin-left: 0.6em;
      color: var(--color-base);
      position: relative;
      top: -30px;
    }
  }
  blockquote {
    font-family: inherit;
    font-style: normal;
    text-align: left;
    border-left: 4px solid #333;
    padding: 2px 8px;
  }

  blockquote cite {
    display: block;
    font-size: 17px;
    color: #bbb;
    margin: 30px 0;
  }
`;

export const StyledMenu = styled.div`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #000; //var(--bg-sections);
  border-radius: 4px;
  transition: opacity 0.75s;

  > * + * {
    margin-left: 8px;
  }
  .button {
    cursor: pointer;
    color: #777;
    &.active {
      color: #fff;
    }
    .material-icons {
      font-size: 15px;
      padding: 2px;
    }
  }
`;

export const StyledContent = styled.div`
  padding-bottom: 120px;
`;
