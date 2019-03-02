import styled from "styled-components";

export const EditorWrapper = styled.div`
  font-size: 1rem;
  font-weight: 200;
  font-style: normal;
  font-family: "Roboto", sans-serif;
  text-rendering: optimizeLegibility;
  color: #1a1a1a;

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  padding: 2rem;
  line-height: 1.625;

  h1 {
    font-family: "Raleway", "Lucida Sans", "Lucida Sans Regular",
      "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-weight: 200;
    font-size: 3.5rem;
    text-rendering: optimizeLegibility;
    line-height: 1;
    margin-top: 3.5rem;
    color: #3a3a3a;
    border-bottom: solid 1px #3a3a3a;
  }

  ul,
  ol {
    margin: 2em 0;
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

export const StyledToolBar = styled.div`
  opacity: 0;
  position: absolute;
  left: 0px;
  z-index: 9;
  background: #fff;
  display: flex;
  flex-direction: row;
  .button-wrapper {
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    .toggle-button {
      transition: 0.1s transform ease-in-out;
      border: 1px solid #ddd;
      border-radius: 100%;
      padding: 4px;
      font-size: 30px;
      user-select: none;
    }
  }
  @keyframes toolbarOpen {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }

  .toolbar-menu {
    display: none;
    padding-left: 10px;
    background: var(--bg-base);
    text-align: center;
    user-select: none;
    transform: scaleX(0);
    margin-top: -4px;
    transition: 0.1s transform ease-in-out;
    transform-origin: left center;
    animation: toolbarOpen 0.2s;
    .material-icons {
      font-size: 18px;
      vertical-align: text-bottom;
      padding: 6px 6px;
      border: 1px solid #eee;
      border-radius: 50%;
      margin-right: 5px;
      vertical-align: text-bottom;
    }
  }
  &.active {
    .button-wrapper .toggle-button {
      transform: rotate(45deg);
    }
    .toolbar-menu {
      transform: scaleX(1);
      display: inline-block;
    }
  }

  > * + * {
    margin-left: 8px;
  }
  .button {
    color: #ccc;
    cursor: pointer;
    .material-icons {
      vertical-align: text-bottom;
    }
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
