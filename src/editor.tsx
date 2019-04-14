import React, { Component } from "react";
import { Value, Editor } from "slate";
import {
  Editor as SlateReactEditor,
  EventHook,
  getEventTransfer,
  findDOMNode
} from "slate-react";
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
import scrollToCursor from "./helper/scrollToCursor";
import Html from "slate-html-serializer";
import { showMenu } from "./helper/showMenu";
import { getRules } from "./helper/rules";
import Toolbar from "./components/Toolbar";
import { Theme } from "./theme.css";
import showdown from "showdown";

const converter = new showdown.Converter();

export interface LetterpadEditorProps {
  onButtonClick(
    e: MouseEvent,
    type: string,
    callbacks: { [key: string]: Function }
  ): void;
  onBeforeRender(props: { type: string }): void;
  getCharCount?(count: number): void;
  onChange?(html: string, value?: Value): void;
  width?: number;
  theme?: string;
  spellCheck?: boolean;
}

interface LetterpadEditorState {
  menuButtons: EditorButton[];
  toolbarButtons: EditorButton[];
  toolbarActive: boolean;
  toolbarPosition: {
    top: number;
    left: number;
    width: number;
  };
  slateReactPlugins: SlateReactPlugin[];
  pluginsMap: PluginsMap;
  value: Value;
  html: string;
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

    let { identifier, renderType } = pluginConfig;
    if (identifier != null && renderType != null) {
      identifier.forEach(id => {
        pluginsMap[renderType as keyof PluginsMap][id] = {
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
    html: "",
    toolbarActive: false,
    toolbarPosition: {
      top: 0,
      left: 0,
      width: 0
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
    const html = this.html.serialize(value);
    this.setState({ value, html });

    // Everytime there is a change in the editor, we have to check if the cursor is
    // inside an empty block. If so, then we display an additional toolbar
    if (
      !value.focusBlock ||
      value.focusBlock.text ||
      ["section", "p"].indexOf(value.focusBlock.type) === -1 ||
      value.inlines.size > 0
    ) {
      this.setState({
        toolbarActive: false,
        toolbarPosition: {
          left: this.state.toolbarPosition.left,
          top: this.state.toolbarPosition.top,
          width: 0
        }
      });
    } else {
      // else check if any text has been selected. If so, get the node of the cursor
      let cursorNode;
      try {
        cursorNode = findDOMNode(this.editor!.value.focusBlock);
      } catch (e) {}
      if (cursorNode) {
        // ge the position of the cursor
        const { top, left, width } = cursorNode.getBoundingClientRect();
        // display the menubar
        this.setState({
          toolbarActive: true,
          toolbarPosition: {
            top: top + window.scrollY + 28,
            left: left - 60,
            width: width + 60
          }
        });
      }
    }

    if (value.fragment.nodes.size > 0) {
      const node = value.fragment.nodes.first();
      const plugin = this.state.pluginsMap.node[node.type];
      if (plugin) {
        if (plugin.plugin.allowChildTransforms === false) {
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
        if (plugin.plugin.allowChildTransforms === false) {
          if (this.menuRef && this.menuRef.current) {
            this.menuRef.current.removeAttribute("style");
            return;
          }
        }
      }
    }
  };

  onPaste: EventHook = (event, editor) => {
    scrollToCursor();
    const transfer = getEventTransfer(event);
    if (transfer.type != "html") {
      // convert markdown to html
      let html = converter.makeHtml((transfer as any).text);
      const { document } = this.html.deserialize(html);
      return editor.insertFragment(document);
    }

    const parentTag = editor.value.blocks.first().type; // p, pre, etc
    for (let i = 0; i < pluginConfigs.length; i++) {
      const config = pluginConfigs[i];
      if (config.onPasteReturnHtml === false) {
        if (config.identifier && config.identifier.indexOf(parentTag) >= 0) {
          return editor.insertText((transfer as any).text);
        }
      }
    }
    // remove style attr
    const REMOVE_STYLE_ATTR = /style="[^\"]*"/gi;
    let html = (transfer as any).html.replace(REMOVE_STYLE_ATTR, "");
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

  componentDidUpdate = (_: any, prevState: any) => {
    this.updateMenu();
    const { html } = this.state;
    if (typeof this.props.onChange === "function" && prevState.html !== html) {
      this.props.onChange(html);
    }
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

  triggerWordCountHook = (value: Value) => {
    const totalBlocks = value.document.getBlocks();
    if (totalBlocks.size > 0) {
      let charCount = 0;
      charCount = totalBlocks.reduce((memo: number, b: any) => {
        return memo + b.text.trim().split(/\s+/).length;
      }, 0);
      if (this.props.getCharCount) {
        this.props.getCharCount(charCount);
      }
    }
  };

  renderEditor: SlateReactPlugin["renderEditor"] = (props, editor, next) => {
    const children = next();
    this.editor = editor;

    const callbacks = {
      onBeforeRender: this.props.onBeforeRender,
      onButtonClick: this.props.onButtonClick,
      getCharCount: this.props.getCharCount
    };
    const data = {
      props,
      editor,
      next,
      callbacks,
      onClick: this.toggleToolbarClass
    };

    // trigger the word count hook
    this.triggerWordCountHook(props.value);

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
      <Theme theme={this.props.theme}>
        <EditorWrapper width={this.props.width}>
          <SlateReactEditor
            autoFocus={true}
            spellCheck={this.props.spellCheck}
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
            placeholder="Compose a story.."
          />
        </EditorWrapper>
      </Theme>
    );
  }
}
