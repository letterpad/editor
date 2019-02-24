import styled from "styled-components";

export const EditorWrapper = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  font-style: normal;
  font-family: "EB Garamond", serif;

  padding: 2rem;
  line-height: 1.5;

  h1 {
    font-family: "Raleway", "Lucida Sans", "Lucida Sans Regular",
      "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-weight: 200;
    font-size: 3.25rem;
    line-height: 1rem;
    margin-top: 3.25rem;
    color: #3a3a3a;
  }

  ul {
    list-style: none;
    li:before {
      padding: 0 1rem;
      font-size: 1rem;
      content: "⁃";
      color: #3a3a3a;
    }
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
  position: fixed;
  bottom: 0px;
  width: 100%;
  left: 0px;
  z-index: 9;

  display: flex;
  flex-flow: column-reverse;
  .toolbar-menu {
    padding: 8px;
    box-shadow: 0px -6px 20px rgba(0, 0, 0, 0.42);
    background: var(--bg-base);
    text-align: center;
    user-select: none;

    .material-icons {
      font-size: 18px;
      vertical-align: text-bottom;
    }
  }

  > * {
    display: inline-block;
  }
  > * + * {
    margin-left: 8px;
  }
  .button {
    color: #ccc;
    cursor: pointer;
    .material-icons {
      font-size: 15px;
      vertical-align: text-bottom;
      padding: 2px 4px;
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
