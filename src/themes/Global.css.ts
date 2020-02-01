import styled, { createGlobalStyle } from "styled-components";

import dark from "./dark";
import light from "./light";

const base = require("./base.css");
const themes = {
  light,
  dark
};
enum Themes {
  light,
  dark
}

export const GlobalStyle = createGlobalStyle<{ style: string; theme: Themes }>`
    ${base}
    :root {
        ${p => themes[p.theme]}
    }
    body {
        background: var(--bg-base);
        color: var(--color-base);
    }
    ${p => p.style}
`;

export const Style = styled.div<any>`
  :root {
    ${p => themes[p.theme]}
  }
  ${base}
  body {
    background: var(--bg-base);
    color: var(--color-base);
  }
  #letterpad-editor-container {
    div[data-slate-editor="true"] {
      padding-bottom: 400px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      text-rendering: optimizeLegibility;
      line-height: 1;
      padding-top: var(--spacingTop);
      padding-bottom: var(--spacingBottom);
    }

    h1 {
      font-size: 2rem;
      border-bottom: solid 1px var(--color-border);
    }

    h2 {
      font-size: 1.6rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    h4 {
      font-size: 1.2rem;
    }

    h5 {
      font-size: 1.1rem;
    }

    h6 {
      font-size: 1rem;
    }

    section {
      padding: 0;
      padding-top: var(--spacingTop);
      padding-bottom: var(--spacingBottom);
      text-align: justify;
      line-height: 25px;
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
    ol,
    ul {
      padding-left: 2em;
    }
    ol ol,
    ol ul,
    ul ol,
    ul ul {
      margin-bottom: 0;
      margin-top: 0;
    }
    li {
      word-wrap: break-all;
    }
    li > p {
      margin-top: 8px;
    }
    li + li {
      margin-top: 0.25em;
    }

    blockquote,
    dl,
    ol,
    pre,
    table,
    ul {
      margin-bottom: 16px;
      margin-top: 0;
    }
    blockquote {
      border-left: 0.25em solid var(--color-border);
      padding: 0 1em;
    }
    blockquote > :first-child {
      margin-top: 0;
    }
    blockquote > :last-child {
      margin-bottom: 0;
    }
    code {
      padding: 0.5em 1em;
      white-space: nowrap;
    }
    code.code-block {
      display: block;
      overflow-x: auto;
      padding: 0.5em 1em;
      line-height: 1.4em;
      color: #c5c8c6;
      background: #131b1f;
      border-radius: 4px;
      border: 1px solid #283237;
    }

    code pre {
      -webkit-font-smoothing: initial;
      font-size: 13px;
      direction: ltr;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      tab-size: 4;
      hyphens: none;
      padding: 0px;
      margin: 0;
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
  }
  ${p => p.style}
`;
