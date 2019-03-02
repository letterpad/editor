import React from "react";
import { Value, Editor } from "slate";
import {
  Editor as SlateReactEditor,
  EventHook,
  getEventTransfer,
  findDOMNode
} from "slate-react";
import { Component } from "react";
import AutoReplace from "slate-auto-replace";
import { Plugin as SlateReactPlugin } from "slate-react";
import {
  PluginConfig,
  pluginConfigs,
  EditorButton,
  PluginsMap
} from "./plugins";
import { StyledMenu, EditorWrapper, StyledContent } from "./editor.css";
import { mapPropsToComponents } from "./helper/util";
import schemaProps from "./helper/schema";
import initialValue from "./value";
import { renderNode, renderMark } from "./helper/renderer";
import { decorateNode } from "./plugins/codeblock/CodeblockUtils";
import scrollToCursor from "./helper/scrollToCursor";
import Html from "slate-html-serializer";
import { showMenu } from "./helper/showMenu";
import { getRules } from "./helper/rules";
import Toolbar from "./components/Toolbar";

export interface LetterpadEditorProps {
  onButtonClick(e: MouseEvent, type: string): void;
  onBeforeRender(props: { type: string }): void;
}

interface LetterpadEditorState {
  menuButtons: EditorButton[];
  toolbarButtons: EditorButton[];
  toolbarActive: boolean;
  toolbarPosition: {
    top: number;
    left: number;
  };
  slateReactPlugins: SlateReactPlugin[];
  pluginsMap: PluginsMap;
  value: Value;
}

/**
 * Initial state for the Letterpad Editor
 */
function getInitialState(pluginConfigs: PluginConfig[]): LetterpadEditorState {
  const menuButtons: LetterpadEditorState["menuButtons"] = [];
  const toolbarButtons: LetterpadEditorState["toolbarButtons"] = [];
  const slateReactPlugins: LetterpadEditorState["slateReactPlugins"] = [];
  const pluginsMap: LetterpadEditorState["pluginsMap"] = {
    node: {},
    mark: {},
    inline: {}
  };

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
    if (pluginConfig.slatePlugin != null) {
      slateReactPlugins.push(pluginConfig.slatePlugin());
    }

    // collect slate react plugins from markdown config
    if (pluginConfig.markdown != null) {
      slateReactPlugins.push(AutoReplace(pluginConfig.markdown));
    }

    let { identifier, tag } = pluginConfig;
    if (identifier != null && tag != null) {
      identifier.forEach(id => {
        pluginsMap[tag as keyof PluginsMap][id] = {
          plugin: pluginConfig,
          is: id
        };
      });
    }
  }

  return {
    menuButtons,
    toolbarButtons,
    slateReactPlugins,
    pluginsMap,
    value: Value.fromJSON(initialValue),
    toolbarActive: false,
    toolbarPosition: {
      top: 0,
      left: 0
    }
  };
}

export class LetterpadEditor extends Component<
  LetterpadEditorProps,
  LetterpadEditorState
> {
  private rules = getRules();
  private editor: Editor | undefined;
  private menuRef = React.createRef<HTMLDivElement>();
  private toolbarRef = React.createRef<HTMLDivElement>();
  private html = new Html({ rules: this.rules });

  state = getInitialState(pluginConfigs);

  onChange = ({ value }: { value: Value }) => {
    this.setState({ value });

    if (
      !value.focusBlock ||
      value.focusBlock.text ||
      value.focusBlock.type !== "paragraph"
    ) {
      this.setState({
        toolbarActive: false
      });
    } else {
      let cursorNode;
      try {
        cursorNode = findDOMNode(this.editor!.value.focusBlock);
      } catch (e) {}
      if (cursorNode) {
        const { top, left } = cursorNode.getBoundingClientRect();
        this.setState({
          toolbarActive: true,
          toolbarPosition: {
            top: top + window.scrollY - 8,
            left: left - 60
          }
        });
      }
    }

    if (value.fragment.nodes.size > 0) {
      const node = value.fragment.nodes.first();
      const plugin = this.state.pluginsMap.node[node.type];
      if (plugin) {
        if (plugin.plugin.allowChildTransform === false) {
          if (this.menuRef && this.menuRef.current) {
            this.menuRef.current.removeAttribute("style");
            return;
          }
        }
      }
    }
    if (value.activeMarks.size > 0) {
      const mark = value.activeMarks.first();
      const plugin = this.state.pluginsMap.mark[mark.type];
      if (plugin) {
        if (plugin.plugin.allowChildTransform === false) {
          if (this.menuRef && this.menuRef.current) {
            this.menuRef.current.removeAttribute("style");
            return;
          }
        }
      }
    }
  };

  onPaste: EventHook = (event, editor, next) => {
    scrollToCursor();
    const transfer = getEventTransfer(event);
    if (transfer.type != "html") return next();

    // remove style attr
    const REMOVE_STYLE_ATTR = /style="[^\"]*"/gi;
    const html = (transfer as any).html.replace(REMOVE_STYLE_ATTR, "");

    // TODO: fix the transfer as any
    const { document } = this.html.deserialize(html);
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

  toggleToolbarClass = () => {
    if (this.toolbarRef.current) {
      const classes = this.toolbarRef.current.classList;
      if (classes.contains("active")) {
        classes.remove("active");
      } else {
        classes.add("active");
      }
    }
  };

  renderEditor: SlateReactPlugin["renderEditor"] = (props, editor, next) => {
    const children = next();
    this.editor = editor;

    const callbacks = {
      onBeforeRender: this.props.onBeforeRender,
      onButtonClick: this.props.onButtonClick
    };
    const data = {
      props,
      editor,
      next,
      callbacks,
      onClick: this.toggleToolbarClass
    };

    return (
      <>
        <StyledContent>{children}</StyledContent>
        <StyledMenu ref={this.menuRef} className="menu hover-menu">
          {mapPropsToComponents(this.state.menuButtons, {
            ...data
          })}
        </StyledMenu>
        <Toolbar
          hidden={!this.state.toolbarActive}
          position={this.state.toolbarPosition}
          editor={this.editor}
          buttons={this.state.toolbarButtons}
          data={data}
        />
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
          renderNode={(props, _, next) =>
            renderNode({
              props,
              next,
              callbacks: eventHandlers,
              pluginsMap: this.state.pluginsMap
            })
          }
          renderMark={(props, _, next) =>
            renderMark({
              props,
              next,
              callbacks: eventHandlers,
              pluginsMap: this.state.pluginsMap
            })
          }
          renderEditor={this.renderEditor}
          decorateNode={decorateNode}
          placeholder="Compose a story.."
        />
      </EditorWrapper>
    );
  }
}
