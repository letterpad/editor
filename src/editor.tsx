import React from "react";
import { Editor as SlateEditor, Value } from "slate";
import {
  Editor as SlateReactEditor,
  EventHook,
  getEventTransfer
} from "slate-react";
import { ComponentType, Component } from "react";
import AutoReplace, { AutoReplaceParams } from "slate-auto-replace";
import { Plugin as SlateReactPlugin } from "slate-react";
import { PluginConfig, pluginConfigs } from "./plugins";
import { StyledMenu, StyledToolBar, EditorWrapper } from "./App.css";
import { mapPropsToComponents } from "./helper/util";
import schemaProps from "./helper/schema";
import initialValue from "./value";
import { renderNode, renderMark } from "./helper/renderer";
import { decorateNode } from "./plugins/codeblock/CodeblockUtils";
import scrollToCursor from "./helper/scrollToCursor";
import Html from "slate-html-serializer";
import { showMenu } from "./helper/showMenu";

export interface EditorEventHandler {
  (event: Event, editor: SlateEditor, next: () => any): any;
}

export type EditorButtonComponent = ComponentType<{
  editor: SlateEditor;
  type: string;
  callbacks: {
    [key: string]: any;
  };
  next: () => any;
}>;

export interface EditorButton<P = any> {
  button: EditorButtonComponent;
  props?: P;
}

export interface LetterpadEditorPluginConfig {
  type: string;
  tag?: string;
  identifier?: string[];
  menuButtons?: EditorButton[];
  toolbarButtons?: EditorButton[];
  main?: (options?: any) => SlateReactPlugin;
  markdown?: AutoReplaceParams;
  [key: string]: any;
}

export interface LetterpadEditorProps {
  onButtonClick(e: MouseEvent, type: string): void;
  onBeforeRender(props: { type: string }): void;
}

interface LetterpadEditorState {
  menuButtons: EditorButton[];
  toolbarButtons: EditorButton[];
  slateReactPlugins: SlateReactPlugin[];
  value: Value;
}

/**
 * Initial state for the Letterpad Editor
 */
function getInitialState(pluginConfigs: PluginConfig[]): LetterpadEditorState {
  const menuButtons: LetterpadEditorState["menuButtons"] = [];
  const toolbarButtons: LetterpadEditorState["toolbarButtons"] = [];
  const slateReactPlugins: LetterpadEditorState["slateReactPlugins"] = [];

  // Collect all necessary things
  for (const pluginConfig of pluginConfigs) {
    // collect menubuttons
    if (pluginConfig.menuButtons != null) {
      menuButtons.push(...pluginConfig.menuButtons);
    }

    // collect toolbar buttons
    if (pluginConfig.toolbarButtons != null) {
      toolbarButtons.push(...pluginConfig.toolbarButtons);
    }

    // collect slate react plugins
    if (pluginConfig.main != null) {
      slateReactPlugins.push(pluginConfig.main());
    }

    // collect slate react plugins from markdown config
    if (pluginConfig.markdown != null) {
      slateReactPlugins.push(AutoReplace(pluginConfig.markdown));
    }
  }

  return {
    menuButtons,
    toolbarButtons,
    slateReactPlugins,
    value: Value.fromJSON(initialValue)
  };
}

export class LetterpadEditor extends Component<
  LetterpadEditorProps,
  LetterpadEditorState
> {
  private menuRef = React.createRef<HTMLDivElement>();
  private html = new Html();

  state = getInitialState(
    pluginConfigs.reduce((acc, cur) => [...acc, ...cur], [])
  );

  onChange = ({ value }: { value: Value }) => {
    this.setState({ value });
  };

  onPaste: EventHook = (event, editor, next) => {
    scrollToCursor();
    const transfer = getEventTransfer(event);
    if (transfer.type != "html") return next();
    // TODO: fix the transfer as any
    const { document } = this.html.deserialize((transfer as any).html);
    editor.insertFragment(document);
  };

  hideMenu = (e: KeyboardEvent) => {
    const { current } = this.menuRef;
    if (current != null && e.keyCode === 27) {
      current.removeAttribute("style");
    }
  };

  updateMenu = () => {
    const menu = this.menuRef.current;
    if (!menu) return;

    const { value } = this.state;
    showMenu(menu, value);
  };

  componentDidMount() {
    this.updateMenu();
    document.addEventListener("keyup", this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.hideMenu);
  }

  componentDidUpdate = () => {
    this.updateMenu();
  };

  renderEditor: SlateReactPlugin["renderEditor"] = (props, editor, next) => {
    const children = next();

    const data = {
      props,
      editor,
      next
    };

    return (
      <>
        {children}
        <StyledMenu ref={this.menuRef} className="menu hover-menu">
          {mapPropsToComponents(this.state.menuButtons, {
            ...data,
            callbacks: {
              onBeforeRender: this.props.onBeforeRender,
              onButtonClick: this.props.onButtonClick
            }
          })}
        </StyledMenu>
        <StyledToolBar>
          <div className="menu toolbar-menu">
            {mapPropsToComponents(this.state.toolbarButtons, data)}
          </div>
        </StyledToolBar>
      </>
    );
  };

  render() {
    const eventHandlers = {
      onBeforeRender: this.props.onBeforeRender,
      onButtonClick: this.props.onButtonClick
    };

    return (
      <EditorWrapper>
        <SlateReactEditor
          schema={schemaProps}
          plugins={this.state.slateReactPlugins}
          value={this.state.value}
          onChange={this.onChange}
          onPaste={this.onPaste}
          renderNode={(p, _, n) => renderNode(p, n, eventHandlers)}
          renderMark={(p, _, n) => renderMark(p, n, eventHandlers)}
          renderEditor={this.renderEditor}
          decorateNode={decorateNode}
          placeholder="Compose a story.."
        />
      </EditorWrapper>
    );
  }
}
