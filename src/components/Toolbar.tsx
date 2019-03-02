import React, {
  FunctionComponent,
  useState,
  useRef,
  ComponentType
} from "react";
import { Editor } from "slate";
import styled from "styled-components";
import { mapPropsToComponents } from "../helper/util";
import { EditorButton } from "../plugins";
import cx from "classnames";

const ToggleButton = styled.span`
  transition: 0.1s transform ease-in-out;
  border: 1px solid #ddd;
  border-radius: 100%;
  padding: 4px;
  font-size: 30px;
  user-select: none;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  background: #fff;
`;

const ToolbarMenu = styled.div`
  display: none;
  padding-left: 10px;
  background: var(--bg-base);
  text-align: center;
  user-select: none;
  transform: scaleX(0);
  margin-top: -4px;
  transition: 0.1s transform ease-in-out;
  transform-origin: left center;

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
    border: 1px solid #eee;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: text-bottom;
  }
`;

const PlaceholderContainer = styled.div`
  width: 100%;
`;

const StyledToolBar = styled.div`
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
    color: #ccc;
    cursor: pointer;
    .material-icons {
      vertical-align: text-bottom;
    }
  }
`;

interface ToolbarProps {
  hidden: boolean;
  editor: Editor;
  buttons: EditorButton[];
  data: any;
  position: {
    top: number;
    left: number;
  };
}

interface PlaceholderState {
  component: ComponentType<any>;
}

const Toolbar: FunctionComponent<ToolbarProps> = ({
  hidden,
  editor,
  buttons,
  data,
  position
}) => {
  const [menuActive, setMenuActive] = useState(false);
  const [Placeholder, setPlaceholder] = useState<PlaceholderState | null>(null);
  const root = useRef<HTMLDivElement>();
  const menu = useRef<HTMLDivElement>();

  document.addEventListener("mousedown", e => {
    if (!root.current) return;
    if (!root.current.contains(e.target as Node)) {
      setMenuActive(false);
      setPlaceholder(null);
    }
  });
  if (menu.current) {
    menu.current.querySelectorAll(".material-icons").forEach(node => {
      node.addEventListener("mousedown", () => {
        menuActive && setMenuActive(false);
      });
    });
  }

  function showPlaceholder(component: ComponentType) {
    setPlaceholder({
      component
    });
  }

  function completePlaceholder() {
    setPlaceholder(null);
  }

  data.callbacks.showPlaceholder = showPlaceholder;

  return (
    <StyledToolBar
      ref={root}
      className={cx({ hidden, active: menuActive })}
      style={{
        top: position.top,
        left: position.left
      }}
    >
      <ButtonWrapper>
        <ToggleButton
          id="letterpad-editor-toolbar-toggle-button"
          className="material-icons toggle-button"
          onClick={() => {
            setMenuActive(!menuActive);
            if (menuActive) {
              editor.focus();
            }
          }}
        >
          add
        </ToggleButton>
        <ToolbarMenu className="menu" ref={menu}>
          {mapPropsToComponents(buttons, {
            ...data
          })}
        </ToolbarMenu>
      </ButtonWrapper>
      {Placeholder != null && (
        <PlaceholderContainer>
          <Placeholder.component
            editor={editor}
            onComplete={completePlaceholder}
          />
        </PlaceholderContainer>
      )}
    </StyledToolBar>
  );
};

export default Toolbar;
