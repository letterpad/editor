/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";

import { Value } from "slate";
import { getEventTransfer } from "slate-react";
import Html from "slate-html-serializer";
import { Editor } from "slate-react";

import schema from "./helper/schema";
import rules from "./helper/rules";
import initialValue from "./value.json";
import scrollToCursor from "./helper/scrollToCursor";
import { renderNode, renderMark } from "./helper/renderer";

import { pluginConfigs } from "./plugins";
import { ImageButton, ImagePlugin } from "./plugins/image";
import { MarkdownPlugin } from "./plugins/markdown";
import { CodeblockPlugin, CodeblockButton } from "./plugins/codeblock";

import { StyledMenu, EditorWrapper, StyledToolBar } from "./App.css";
import { decorateNode } from "./plugins/codeblock/CodeblockUtils";

const html = new Html({ rules });

const menuButtons = [];
const toolbarButtons = [];

// Apply plugins
const plugins = [
    // PluginPrism({
    //     onlyIn: node => node.type === "code_block",
    //     getSyntax: node => node.data.get("syntax")
    // }),
    // // ImagePlugin(),
    // // MarkdownPlugin(),
];

pluginConfigs.forEach(config => {
    if (!Array.isArray(config)) {
        config = [config];
    }
    config.forEach(plugin => {
        const _menuButtons = plugin.menuButtons;
        if (Array.isArray(_menuButtons)) {
            _menuButtons.forEach(b => menuButtons.push(b));
        }
        const _toolbarButtons = plugin.toolbarButtons;
        if (Array.isArray(_toolbarButtons)) {
            _toolbarButtons.forEach(b => toolbarButtons.push(b));
        }
        if (plugin.main) {
            plugins.push(plugin.main());
        }
    });
});

class App extends Component {
    static propTypes = {
        post: PropTypes.object,
        update: PropTypes.func
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
    /**
     * Update the menu's absolute position.
     */

    updateMenu = () => {
        const menu = this.menuRef.current;
        if (!menu) return;

        const { value } = this.state;
        const { fragment, selection } = value;

        if (
            selection.isBlurred ||
            selection.isCollapsed ||
            fragment.text === ""
        ) {
            menu.removeAttribute("style");
            return;
        }

        const native = window.getSelection();
        const range = native.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        menu.style.opacity = 1;
        menu.style.top = `${rect.top +
            window.pageYOffset -
            menu.offsetHeight}px`;

        menu.style.left = `${rect.left +
            window.pageXOffset -
            menu.offsetWidth / 2 +
            rect.width / 2}px`;
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

    mapPropsToComponents = (componentList, props) => {
        return componentList.map(item => {
            return React.cloneElement(item, { ...props });
        });
    };

    renderEditor = (props, editor, next) => {
        const children = next();
        return (
            <React.Fragment>
                {children}
                <StyledMenu ref={this.menuRef} className="menu hover-menu">
                    {this.mapPropsToComponents(menuButtons, {
                        props,
                        editor,
                        next
                    })}
                </StyledMenu>
                <StyledToolBar>
                    <div className="menu toolbar-menu">
                        {this.mapPropsToComponents(toolbarButtons, {
                            props,
                            editor,
                            next
                        })}
                    </div>
                </StyledToolBar>
            </React.Fragment>
        );
    };

    render() {
        return (
            <EditorWrapper>
                <Editor
                    schema={schema}
                    plugins={plugins}
                    defaultValue={this.state.value}
                    onChange={this.onChange}
                    onPaste={this.onPaste}
                    ref={this.editorRef}
                    renderNode={renderNode}
                    renderMark={renderMark}
                    renderEditor={this.renderEditor}
                    decorateNode={decorateNode}
                    placeholder="Compose a story.."
                />
            </EditorWrapper>
        );
    }
}

export default App;
