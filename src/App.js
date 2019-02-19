/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Value } from "slate";
import { getEventTransfer } from "slate-react";
import Html from "slate-html-serializer";
import { Editor } from "slate-react";

import schema from "./helper/schema";
import rules from "./helper/rules";
import scrollToCursor from "./helper/scrollToCursor";
import { renderNode, renderMark } from "./helper/renderer";
import { showMenu } from "./helper/showMenu";

import { menuButtons, toolbarButtons, plugins } from "./plugins";
import { decorateNode } from "./plugins/codeblock/CodeblockUtils";

import initialValue from "./value.json";
import { StyledMenu, EditorWrapper, StyledToolBar } from "./App.css";
import { mapPropsToComponents } from "./helper/util";

const html = new Html({ rules });

class App extends Component {
    static propTypes = {
        onButtonClick: PropTypes.func
    };

    state = {
        value: Value.fromJSON(initialValue)
    };

    menuRef = React.createRef();
    editorRef = React.createRef();

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

    hideMenu = e => {
        if (e.keyCode === 27) {
            this.menuRef.current.removeAttribute("style");
        }
    };

    updateMenu = () => {
        const menu = this.menuRef.current;
        if (!menu) return;

        const { value } = this.state;
        showMenu(menu, value);
    };

    onChange = ({ value }) => {
        this.setState({ value });
    };

    onPaste = (event, editor, next) => {
        scrollToCursor();
        const transfer = getEventTransfer(event);
        if (transfer.type != "html") return next();
        const { document } = html.deserialize(transfer.html);
        editor.insertFragment(document);
    };

    getCallbacks = () => {
        const { onButtonClick, onBeforeRender } = this.props;
        return { onButtonClick, onBeforeRender };
    };

    renderEditor = (props, editor, next) => {
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
                        {mapPropsToComponents(toolbarButtons, { ...data })}
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
                    defaultValue={this.state.value}
                    onChange={this.onChange}
                    onPaste={this.onPaste}
                    ref={this.editorRef}
                    renderNode={(p, e, n) => renderNode(p, e, n, callbacks)}
                    renderMark={(p, e, n) => renderMark(p, e, n, callbacks)}
                    renderEditor={this.renderEditor}
                    decorateNode={decorateNode}
                    placeholder="Compose a story.."
                />
            </EditorWrapper>
        );
    }
}

export default App;
