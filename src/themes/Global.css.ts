import { createGlobalStyle } from "styled-components";
const light = require("./light.css");
const dark = require("./dark.css");
const base = require("./base.css");
const themes = {
  light,
  dark
};
enum Themes {
  light,
  dark
}

export const GlobalStyle = createGlobalStyle<{ theme: Themes }>`
    ${base}
    :root {
        ${p => themes[p.theme]}
    }
    body {
        background: var(--bg-base);
        color: var(--color-base);
    }
`;
