import React, { PureComponent } from "react";
import { Value, Editor, Block } from "slate";
import {
  Editor as SlateReactEditor,
  EventHook,
  findDOMNode
} from "slate-react";
import Html from "slate-html-serializer";
import { Plugin as SlateReactPlugin } from "slate-react";
import { pluginConfigs } from "./plugins";
import { StyledMenu, EditorWrapper, StyledContent } from "./editor.css";
import { mapPropsToComponents, isEmptyLine, keyMap } from "./helper/util";
import schemaProps from "./helper/schema";
import initialValue from "./value";
import { renderNode, renderMark, renderInline } from "./helper/renderer";
import scrollToCursor from "./helper/scrollToCursor";
import { showMenu } from "./helper/showMenu";
import { getRules } from "./helper/rules";
import Toolbar from "./components/Toolbar";
import { Theme } from "./theme.css";
import { handlePaste } from "./helper/handlePaste";
import { LetterpadEditorState, getInitialState } from "./initialState";

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
export class LetterpadEditor extends PureComponent<
  LetterpadEditorProps,
  LetterpadEditorState
> {
  // A set of Serialize/Deserialize functions of each plugin.
  private rules = getRules();
  // Instance of slate editor
  private editor: Editor | undefined;
  // the hover menu
  private menuRef = React.createRef<HTMLDivElement>();
  // handler to serialize/deserialize html
  private htmlRules = new Html({ rules: this.rules });

  toolbarPlaceholderStatus = false;
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

    // if there is no html, then load some demo data
    if (this.props.html === null) {
      this.setState({ value: Value.fromJSON(initialValue) });
    } else {
      // If we have received html which is not empty, then deserialize it to create the Document object.
      // This is required by slate editor to render data on page.
      const value = this.htmlRules.deserialize(
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
    const html = this.htmlRules.serialize(value);
    this.setState({ value, html });

    this.displayLeftToolbarOnNewLine(value);
    this.hideFloatingMenuBasedOnPlugin(value);
  };

  /**
   * Display the + toolbar when its a new line.
   */
  displayLeftToolbarOnNewLine = (value: Value) => {
    if (!this.editor) return;
    if (isEmptyLine(value) || this.toolbarPlaceholderStatus) {
      const topBlock = value.blocks.get(0);
      const position = findDOMNode(topBlock).getBoundingClientRect();
      this.setState({
        toolbarActive: true,
        toolbarPosition: {
          top: position.top + window.scrollY + 24,
          left: position.left - 60,
          width: position.width + 60
        }
      });
    } else {
      this.setState({
        toolbarActive: false
      });
    }
  };

  /**
   * Few plugins of `block` type might not allow further transformations from other plugins.
   * eg. Codeblocks will not allow any other transformation (like bold, italic)
   * to work inside its block.
   */
  hideFloatingMenuBasedOnPlugin = (value: Value) => {
    let parentPlugin = null;
    // for blocks (h1, blockquote,codeblock, etc)
    if (value.fragment.nodes.size > 0) {
      const node = value.fragment.nodes.first();
      parentPlugin = this.state.pluginsMap.node[(node as Block).type];
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

  onPaste: EventHook<React.ClipboardEvent> = (event, editor) => {
    scrollToCursor();
    handlePaste(event, editor, this.htmlRules);
  };

  hideMenu = (e: KeyboardEvent) => {
    const { current } = this.menuRef;
    if (current != null && e.keyCode === keyMap.ESCAPE) {
      current.removeAttribute("style");
    }
  };

  updateMenu = () => {
    const menu = this.menuRef.current;
    if (!menu) return;

    const { value } = this.state;
    showMenu(menu, value);
  };

  triggerWordCountHook = (value: Value) => {
    let wordCount = 0;

    for (const [node] of value.document.blocks({ onlyLeaves: true })) {
      const words = node.text.trim().split(/\s+/);
      wordCount += words.length;
    }
    if (this.props.getCharCount) {
      this.props.getCharCount(wordCount);
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
      callbacks
    };

    // trigger the word count hook
    this.triggerWordCountHook(props.value);
    if (!this.editor) return null;
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
          setPlaceholderStatus={(status: boolean) =>
            (this.toolbarPlaceholderStatus = status)
          }
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
      <Theme theme={this.props.theme} id="letterpad-editor-container">
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
            renderBlock={(props, _editor, next) =>
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
            renderInline={(props, _, next) =>
              renderInline({
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

export default LetterpadEditor;
