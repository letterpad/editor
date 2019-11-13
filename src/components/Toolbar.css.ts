import styled from "styled-components";

export const ToggleButton = styled.span`
  transition: 0.1s transform ease-in-out;
  border: 1px solid #ddd;
  border-radius: 100%;
  padding: 4px;
  font-size: 30px;
  user-select: none;
`;

export const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  /* background: #fff; */
`;

export const ToolbarMenu = styled.div`
  display: none;
  padding-left: 10px;
  background: var(--bg-base);
  text-align: center;
  user-select: none;
  transform: scaleX(0);
  margin-top: -4px;
  transition: 0.1s transform ease-in-out;
  transform-origin: left center;
  margin-top: 4px;

  @keyframes toolbarOpen {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }

  animation: toolbarOpen 0.1s;

  .material-icons {
    font-size: 18px;
    vertical-align: text-bottom;
    padding: 6px 6px;
    border: 1px solid var(--color-base);
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: text-bottom;
  }
`;

export const PlaceholderContainer = styled.div`
  display: flex;
  flex: 1;
  width: ${(props: any) => props.width}px;
`;

export const StyledToolBar = styled.div`
  opacity: 1;
  position: absolute;
  z-index: 9;
  display: flex;
  flex-direction: row;

  &.hidden {
    opacity: 0;
  }

  &.active {
    ${ToggleButton} {
      transform: rotate(45deg);
    }
    ${ToolbarMenu} {
      transform: scaleX(1);
      display: inline-block;
    }
  }

  > * + * {
    margin-left: 8px;
  }

  .button {
    color: var(--color-base);
    cursor: pointer;
    .material-icons {
      vertical-align: text-bottom;
    }
  }
  input {
    background: transparent;
    color: var(--color-base);
  }
`;
