import styled from "styled-components";

const applyFontFamily = (fontFamily: string) => `font-family: ${fontFamily};`;

export const EditorWrapper = styled.div`
  ${({ defaultFont }: { defaultFont: boolean }) =>
    defaultFont &&
    `@import url("https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700|Libre+Franklin:200,200i,400,400i,700,700i");`}

  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
  --editorPadding: 1rem;
  --fontSize: 1.1rem;
  --spacingTop: 2rem;
  --spacingTopSmall: 0.5rem;
  --spacingBottom: 1rem;
  --editorWidth: ${({ width }: { width?: number }) => width}px;

  max-width: var(--editorWidth);
  min-width: 360px;
  margin: auto;

  font-size: var(--fontSize);
  font-weight: 200;
  font-style: normal;
  ${({ defaultFont }: { defaultFont: boolean }) =>
    defaultFont && applyFontFamily(`"Libre Baskerville", serif`)}
  text-rendering: optimizeLegibility;
  padding: var(--editorPadding);
  line-height: 2;

  h1,
  h2,
  h3,
  h4 {
    ${({ defaultFont }: { defaultFont: boolean }) =>
      defaultFont && applyFontFamily(`"Libre Franklin", serif`)}
    text-rendering: optimizeLegibility;
    line-height: 1;
    padding-top: var(--spacingTop);
    padding-bottom: var(--spacingBottom);
  }

  h1 {
    font-size: 4rem;
    border-bottom: solid 1px var(--color-border);
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

  section {
    padding: 0;
    padding-top: var(--spacingTop);
    padding-bottom: var(--spacingBottom);
    text-align: justify;
  }

  h1 + section {
    padding-top: var(--spacingTop);
  }

  h2 + section,
  h3 + section,
  h4 + section {
    padding-top: var(--spacingTopSmall);
  }

  h1 + h2,
  h2 + h3,
  h3 + h4 {
    padding-top: var(--spacingTop);
  }

  ul,
  ol {
    padding: 2rem;
    padding-top: var(--spacingTop);
    padding-bottom: var(--spacingBottom);
  }
  @font-face {
    font-family: "Material Icons";
    font-style: normal;
    font-weight: 400;
    src: local("Material Icons"), local("MaterialIcons-Regular"),
      format("woff2");
  }
  .material-icons {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -moz-font-feature-settings: "liga";
    -moz-osx-font-smoothing: grayscale;
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
    .lp-text-icon {
      border: none;
      margin-right: 0px;
      text-transform: uppercase;
      line-height: 20px;
      font-size: 11px;
      vertical-align: text-bottom;
      padding: 0px;
      width: 22px;
      height: 22px;
      text-align: center;
    }
  }
`;

export const StyledContent = styled.div`
  padding-bottom: 120px;
`;
