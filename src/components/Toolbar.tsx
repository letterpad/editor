import React, {
  FunctionComponent,
  useState,
  useRef,
  ComponentType,
  useEffect
} from "react";
import cx from "classnames";
import { Editor, Block } from "slate";
import { mapPropsToComponents } from "../helper/util";
import { EditorButton } from "../plugins";
import {
  StyledToolBar,
  ButtonWrapper,
  ToggleButton,
  ToolbarMenu,
  PlaceholderContainer
} from "./Toolbar.css";
// import scrollToCursor from "../helper/scrollToCursor";

interface ToolbarProps {
  hidden: boolean;
  editor: Editor;
  buttons: EditorButton[];
  data: any;
  position: {
    top: number;
    left: number;
    width: number;
  };
  setPlaceholderStatus: (display: boolean) => void;
}

interface PlaceholderState {
  component: ComponentType<any>;
}

export interface InputProps {
  onComplete: Function;
  editor: Editor;
  node?: Block;
}

const Toolbar: FunctionComponent<ToolbarProps> = ({
  hidden,
  editor,
  buttons,
  data,
  position,
  setPlaceholderStatus
}) => {
  const [menuActive, setMenuActive] = useState(false);
  const [Placeholder, setPlaceholder] = useState<PlaceholderState | null>(null);
  const root = useRef<HTMLDivElement>();
  const menu = useRef<HTMLDivElement>();
  const placeholderRef = useRef<HTMLDivElement>();
  const placeholder = useRef<HTMLInputElement>();

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    let icons: Array<Element> = [];

    if (menu.current) {
      icons = [
        ...Array.from(
          menu.current.querySelectorAll(".material-icons, .custom-icons")
        )
      ];
      icons.forEach(node => {
        node.addEventListener("mousedown", onButtonClick);
      });
    }
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      icons.forEach(node => {
        node.removeEventListener("mousedown", onButtonClick);
      });
    };
  }, []);

  const onMouseDown = (e: any) => {
    if (root.current) {
      setMenuActive(false);
      if (!e.target.closest(".ph") && !e.target.closest(".menu")) {
        removePlaceholder();
      }
    }
  };
  const onButtonClick = (e: any) => {
    if (menu.current) {
      e.preventDefault();
      menuActive && setMenuActive(false);
    }
  };

  const showPlaceholder = (component: ComponentType) => {
    setPlaceholder({
      component
    });
    setPlaceholderStatus(true);
    /**
     * The set timeout is because the component is not rendered immediately
     * so the placeholder.current is null. we delay this by 1ms and then
     * capture the component that's rendered and focus it.
     *
     * if in case 1ms fails, then increase the timeout
     */
    setTimeout(() => {
      if (placeholder.current && placeholder.current.focus) {
        placeholder.current.focus();
      }
    }, 1);
  };

  const removePlaceholder = () => {
    if (placeholder.current) {
      const prevScrollY = window.scrollY;
      setPlaceholder(null);
      // safari hack
      window.scrollTo(0, prevScrollY);
    }
    setPlaceholderStatus(false);
  };

  const toggleToolbar = (e: React.MouseEvent) => {
    e.preventDefault();
    const newMenuActiveState = !menuActive;
    setMenuActive(newMenuActiveState);
    if (newMenuActiveState) {
      setPlaceholder(null);
    } else {
      setMenuActive(false);
    }
  };

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
          onClick={toggleToolbar}
        >
          add
        </ToggleButton>
        <ToolbarMenu className="menu" ref={menu}>
          {mapPropsToComponents(buttons, {
            ...data
          })}
        </ToolbarMenu>
      </ButtonWrapper>
      {Placeholder && (
        <PlaceholderContainer
          width={position.width}
          ref={placeholderRef}
          className="ph"
        >
          <Placeholder.component
            ref={placeholder}
            editor={editor}
            onComplete={removePlaceholder}
          />
        </PlaceholderContainer>
      )}
    </StyledToolBar>
  );
};

export default Toolbar;
