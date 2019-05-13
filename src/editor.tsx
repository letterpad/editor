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
import initialValue, { initialEmptyValue } from "./value";
import { renderNode, renderMark } from "./helper/renderer";
import scrollToCursor from "./helper/scrollToCursor";
import Html from "slate-html-serializer";
import { showMenu } from "./helper/showMenu";
import { getRules } from "./helper/rules";
import Toolbar from "./components/Toolbar";
import { Theme } from "./theme.css";
import snarkdown from "snarkdown";

// Options available
export interface LetterpadEditorProps {
  defaultFont: boolean;
  getCharCount(count: number): void;
  html: string | null;
  onBeforeRender(props: { type: string }): void;
  onChange(html: string, value?: Value): void;
  onButtonClick(
    e: MouseEvent,
    type: string,
    callbacks: { [key: string]: Function }
  ): void;
  spellCheck: boolean;
  theme: string;
  width: number;
  hooks(editor: Editor, plugins: object): void;
}

// Editor state
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
  hooks: object;
}

/**
 * The Letterpad Editor Class
 *
 * Can be used to convert Document Object, HTML string or Markdown string
 * to build react based UI components.
 *
 * Every plugin which is responsible to handle a particular tag (like img, strong, h1, etc)
 * should be able to serialize (return react component) and deserialize(return Document) the tag.
 * It reads every plugin to know which html tag will be parsed by which plugin.
 *
 * Based on all this information it is able to maintain a `value` object of the slate editor.
 * A Value is the top-level representation of data in Slate, containing both a Document and a Selection.
 * It's what you need to pass into the Slate <Editor> to render something onto the page.
 *
 * @export
 * @class LetterpadEditor
 * @extends {Component<LetterpadEditorProps, LetterpadEditorState>}
 */
export class LetterpadEditor extends Component<
  LetterpadEditorProps,
  LetterpadEditorState
> {
  // A set of Serialize/Deserialize functions of each plugin.
  private rules = getRules();
  // Instance of slate editor
  private editor: Editor | undefined;
  // the hover menu
  private menuRef = React.createRef<HTMLDivElement>();
  // Toolbar at the begining of empty line
  private toolbarRef = React.createRef<HTMLDivElement>();
  // handler to serialize/deserialize html
  private html = new Html({ rules: this.rules });

  // default props
  static defaultProps = {
    onButtonClick: () => {},
    defaultFont: true,
    getCharCount: () => {},
    html: null,
    onBeforeRender: () => {},
    onChange: () => {},
    spellCheck: true,
    theme: "dark",
    width: 740,
    hooks: {}
  };

  state = getInitialState(pluginConfigs);

  componentDidMount() {
    this.updateMenu();

    // if there is no html, then lets load some demo data
    if (this.props.html === null) {
      this.setState({ value: Value.fromJSON(initialValue) });
    } else {
      // If we have received html which is not empty, then deserialize it to create the Document object.
      // This is required by slate editor to render data on page.
      const value = this.html.deserialize(
        this.props.html.replace(new RegExp(">[ ]+<", "g"), "><")
      );
      this.setState({ value });
    }
    document.addEventListener("keyup", this.hideMenu);
  }

  componentDidUpdate = (_: any, prevState: any) => {
    this.updateMenu();
    const { html } = this.state;
    if (prevState.html !== html) {
      this.props.onChange(html);
    }
  };

  componentWillUnmount() {
    document.removeEventListener("keyup", this.hideMenu);
  }

  onChange = ({ value }: { value: Value }) => {
    // Whenever there is a change in the editor, we will convert the value to html
    // and save it in the state.
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

    /**
     * Few plugins of `block` type might not allow further transformations from other plugins.
     * eg. Codeblocks will not allow any other transformation (like bold, italic)
     * to work inside its block.
     */
    let parentPlugin = null;
    // for blocks (h1, blockquote,codeblock, etc)
    if (value.fragment.nodes.size > 0) {
      const node = value.fragment.nodes.first();
      parentPlugin = this.state.pluginsMap.node[node.type];
    }
    // for marks (bold, italic, etc)
    if (value.activeMarks.size > 0) {
      const mark = value.activeMarks.first();
      parentPlugin = this.state.pluginsMap.mark[mark.type];
    }
    if (parentPlugin) {
      if (parentPlugin.plugin.allowChildTransforms === false) {
        // dont show the floating menu
        if (this.menuRef && this.menuRef.current) {
          this.menuRef.current.removeAttribute("style");
          return;
        }
      }
    }
  };

  onPaste: EventHook = (event, editor) => {
    scrollToCursor();
    const transfer = getEventTransfer(event);
    if (transfer.type != "html") {
      // convert markdown to html
      let html = snarkdown((transfer as any).text);
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
    // call hooks
    if (typeof this.props.hooks === "function" && this.editor) {
      this.props.hooks(this.editor, this.state.hooks);
    }
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
        <EditorWrapper
          width={this.props.width}
          defaultFont={this.props.defaultFont}
        >
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
  const hooks = {};

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

    // collect all the plugin utility functions
    if (pluginConfig.hooks != null) {
      (hooks as any)[pluginConfig.name] = { ...pluginConfig.hooks };
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
    value: Value.fromJSON(initialEmptyValue),
    html: "",
    toolbarActive: false,
    hooks,
    toolbarPosition: {
      top: 0,
      left: 0,
      width: 0
    }
  };
}

export default LetterpadEditor;
