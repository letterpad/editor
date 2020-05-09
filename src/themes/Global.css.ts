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
