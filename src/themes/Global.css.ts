import styled, { createGlobalStyle } from "styled-components";

import dark from "./dark";
import light from "./light";

const themes = {
  light,
  dark
};
enum Themes {
  light,
  dark
}

export const GlobalStyle = createGlobalStyle<{ style: string; theme: Themes }>`
  :root {
      ${p => themes[p.theme]}
  }
  body {
      background: var(--bg-base);
      color: var(--color-base);
  }
  ${p => p.style}
  .block-toolbar {
    border-radius: 20px;
  }
  #letterpad-editor-container {
    font-style: normal;
    font-family: "Lora", sans-serif;
    font-size: larger;
  
    text-rendering: optimizeLegibility;
    line-height: 2;
  }
  
  .lp-editor div[data-slate-editor="true"] {
    padding-bottom: 400px;
  }
  .lp-editor {
    line-height: 2;
  }
  .lp-editor p {
    margin: 1.2rem 0px;
  }
  .lp-editor h1,
  .lp-editor h2,
  .lp-editor h3,
  .lp-editor h4,
  .lp-editor h5,
  .lp-editor h6 {
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    text-rendering: optimizeLegibility;
    line-height: 1;
    padding-top: var(--spacingTop);
    padding-bottom: var(--spacingBottom);
  }
  
  .lp-editor h1 {
    font-size: 2rem;
    border-bottom: solid 1px var(--color-border);
  }
  
  .lp-editor h2 {
    font-size: 1.6rem;
  }
  
  .lp-editor h3 {
    font-size: 1.4rem;
  }
  
  .lp-editor h4 {
    font-size: 1.2rem;
  }
  
  .lp-editor h5 {
    font-size: 1.1rem;
  }
  
  .lp-editor h6 {
    font-size: 1rem;
  }
  
  .lp-editor a {
    text-decoration: underline;
  }
  
  .lp-editor hr {
    padding-top: 0.75em;
    margin: 0;
    border: none;
    border-top: 1px solid var(--color-border);
  }
  
  .lp-editor section {
    padding: 0;
    padding-top: var(--spacingTop);
    padding-bottom: var(--spacingBottom);
    text-align: justify;
    line-height: 25px;
  }
  
  .lp-editor h1 + section {
    padding-top: var(--spacingTop);
  }
  
  .lp-editor h2 + section,
  .lp-editor h3 + section,
  .lp-editor h4 + section {
    padding-top: var(--spacingTopSmall);
  }
  
  .lp-editor h1 + .lp-editor h2,
  .lp-editor h2 + .lp-editor h3,
  .lp-editor h3 + .lp-editor h4 {
    padding-top: var(--spacingTop);
  }
  .lp-editor ol,
  .lp-editor ul {
    padding-left: 2em;
  }
  .lp-editor ol .lp-editor ol,
  .lp-editor ol .lp-editor ul,
  .lp-editor ul .lp-editor ol,
  .lp-editor ul .lp-editor ul {
    margin-bottom: 0;
    margin-top: 0;
  }
  .lp-editor li {
    word-wrap: break-all;
  }
  .lp-editor li > .lp-editor p {
    margin-top: 8px;
  }
  .lp-editor li + .lp-editor li {
    margin-top: 0.25em;
  }
  
  .lp-editor blockquote,
  .lp-editor dl,
  .lp-editor ol,
  .lp-editor pre,
  .lp-editor table,
  .lp-editor ul {
    margin-bottom: 16px;
    margin-top: 0;
  }
  .lp-editor .code-block {
    background: black;
    display: block;
    padding: 10px;
    font-size: medium;
  }
  .lp-editor .code-block pre {
    padding: 0px;
    margin-bottom: 0px;
  }
  .lp-editor blockquote {
    border-left: 0.25em solid var(--color-border);
    padding: 0 1em;
  }
  .lp-editor blockquote > :first-child {
    margin-top: 0;
  }
  .lp-editor blockquote > :last-child {
    margin-bottom: 0;
  }
  .lp-editor code {
    padding: 0.2em 0.2em;
    white-space: nowrap;
    background: var(--bg-success);
    color: var(--bg-base);
    border-radius: 0.2em;
    white-space: nowrap;
  }
  .lp-editor code.code-block {
    display: block;
    overflow-x: auto;
    padding: 0.5em 1em;
    line-height: 1.4em;
    color: #c5c8c6;
    background: #131b1f;
    border-radius: 4px;
    border: 1px solid #283237;
  }
  
  .lp-editor code pre {
    -webkit-font-smoothing: initial;
    font-size: 15px;
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
    src: local("Material Icons"), local("MaterialIcons-Regular"), format("woff2");
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

export const Style = styled.div<any>`
  :root {
    ${p => themes[p.theme]}
  }

  body {
    background: var(--bg-base);
    color: var(--color-base);
  }

  ${p => p.style} :root {
    --editorPadding: 1rem;
    --spacingTop: 2rem;
    --spacingTopSmall: 0.5rem;
    --spacingBottom: 1rem;
  }
`;
