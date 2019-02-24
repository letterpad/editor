/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Value } from "slate";
import { getEventTransfer, EventHook } from "slate-react";
import Html from "slate-html-serializer";
import { Editor, Plugin } from "slate-react";

import schema from "./helper/schema";
import rules from "./helper/rules";
import scrollToCursor from "./helper/scrollToCursor";
import { renderMark, renderNode } from "./helper/renderer";
import { showMenu } from "./helper/showMenu";

import { menuButtons, toolbarButtons, plugins } from "./plugins";
import { decorateNode } from "./plugins/codeblock/CodeblockUtils";

import initialValue from "./value";
import { StyledMenu, EditorWrapper, StyledToolBar } from "./App.css";
import { mapPropsToComponents } from "./helper/util";

console.log(plugins);
// const rules = getRules(plugins);

const html = new Html({ rules });

interface AppProps {
  onButtonClick(e: MouseEvent, type: string): void;
  onBeforeRender(props: { type: string }): void;
}

class App extends Component<AppProps> {
  static propTypes = {
    onButtonClick: PropTypes.func
  };

  state = {
    value: Value.fromJSON(initialValue)
  };

  private menuRef = React.createRef<HTMLDivElement>();

  componentDidMount = () => {
    this.updateMenu();
    document.addEventListener("keyup", this.hideMenu);
  };

  componentWillUnmount() {
    document.removeEventListener("keyup", this.hideMenu);
  }

  componentDidUpdate = () => {
    this.updateMenu();
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

  onChange = ({ value }: { value: Value }) => {
    this.setState({ value });
  };

  onPaste: EventHook = (event, editor, next) => {
    scrollToCursor();
    const transfer = getEventTransfer(event);
    if (transfer.type != "html") return next();
    const { document } = html.deserialize((transfer as any).html);
    editor.insertFragment(document);
  };

  getCallbacks = () => {
    const { onButtonClick, onBeforeRender } = this.props;
    return { onButtonClick, onBeforeRender };
  };

  renderEditor: Plugin["renderEditor"] = (props, editor, next) => {
    const children = next();
    const data = { props, editor, next };
    const callbacks = this.getCallbacks();

    return (
      <React.Fragment>
        {children}
        <StyledMenu ref={this.menuRef} className="menu hover-menu">
          {mapPropsToComponents(menuButtons, {
            ...data,
            callbacks: { ...callbacks }
          })}
        </StyledMenu>
        <StyledToolBar>
          <div className="menu toolbar-menu">
            {mapPropsToComponents(toolbarButtons, data)}
          </div>
        </StyledToolBar>
      </React.Fragment>
    );
  };

  render() {
    const callbacks = this.getCallbacks();
    return (
      <EditorWrapper>
        <Editor
          schema={schema}
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          onPaste={this.onPaste}
          renderNode={(p, _, n) => renderNode(p, n, callbacks)}
          renderMark={(p, _, n) => renderMark(p, n, callbacks)}
          renderEditor={this.renderEditor}
          decorateNode={decorateNode}
          placeholder="Compose a story.."
        />
      </EditorWrapper>
    );
  }
}

export default App;
