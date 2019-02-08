/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Value } from "slate";
import { getEventTransfer } from "slate-react";
import Html from "slate-html-serializer";

import ToolBar from "./slatejs/ToolBar";
import rules from "./helper/rules";

import { SlateContent, SlateEditor, TextMenu } from "./slatejs";
import { BoldPlugin, BoldButton } from "./plugins/bold";
import { ItalicPlugin, ItalicButton } from "./plugins/italic";
import { UnderlinePlugin, UnderlineButton } from "./plugins/underline";
import { HighlightPlugin, HighlightButton } from "./plugins/highlight";
import { ListPlugin, ListButtonBar } from "./plugins/list";
import { ImageButton, ImagePlugin } from "./plugins/image";
import { LinkPlugin, LinkButton } from "./plugins/link";
import { MarkdownPlugin } from "./plugins/markdown";
import { HeadingsPlugin, HeadingsButton } from "./plugins/headings";
import { LinebreakPlugin, LinebreakButton } from "./plugins/linebreak";
import { BlockquotePlugin, BlockquoteButton } from "./plugins/blockquote";
import PluginPrism from "slate-prism";
import { CodeblockPlugin, CodeblockButton } from "./plugins/codeblock";
import styled from "styled-components";
import { AutoScrollPlugin } from "./plugins/autoscroll";
import scrollToCursor from "./helper/scrollToCursor";

const html = new Html({ rules });

const StyledMenu = styled(TextMenu)`
    padding: 8px 7px 6px;
    position: absolute;
    z-index: 1;
    top: -10000px;
    left: -10000px;
    margin-top: -6px;
    opacity: 0;
    background-color: #000; //var(--bg-sections);
    border-radius: 4px;
    transition: opacity 0.75s;

    > * + * {
        margin-left: 8px;
    }
    .button {
        cursor: pointer;
        color: #777;
        &.active {
            color: #fff;
        }
        .material-icons {
            font-size: 15px;
            padding: 2px;
        }
    }
`;

const StyledToolBar = styled(ToolBar)`
    > * {
        display: inline-block;
    }
    > * + * {
        margin-left: 8px;
    }
    .button {
        color: #ccc;
        cursor: pointer;
        .material-icons {
            font-size: 15px;
            vertical-align: text-bottom;
            padding: 2px 4px;
        }
    }
`;

const StyledContent = styled(SlateContent)`
    font-size: 18px;
    line-height: 1.8;
    padding-top: 80px;
    margin: 0px 80px;
    hr {
        border: none !important;
        margin-top: 52px;
        margin-bottom: 42px;
        display: block;
        border: 0;
        text-align: center;
        overflow: visible;
        &:before {
            font-family: Georgia, Cambria, "Times New Roman", Times, serif;
            font-weight: 400;
            font-style: italic;
            font-size: 30px;
            letter-spacing: 0.6em;
            content: "...";
            display: inline-block;
            margin-left: 0.6em;
            color: var(--color-base);
            position: relative;
            top: -30px;
        }
    }
    blockquote {
        font-family: inherit;
        font-style: normal;
        text-align: left;
        border-left: 4px solid #333;
        padding: 2px 8px;
    }

    blockquote cite {
        display: block;
        font-size: 17px;
        color: #bbb;
        margin: 30px 0;
    }
`;

// Apply plugins
const plugins = [
    // PluginPrism({
    //     onlyIn: node => node.type === "code_block",
    //     getSyntax: node => node.data.get("syntax")
    // }),
    // CodeblockPlugin(),
    HeadingsPlugin(),
    BoldPlugin(),
    ItalicPlugin(),
    UnderlinePlugin(),
    HighlightPlugin(),
    ListPlugin(),
    // // ImagePlugin(),
    LinkPlugin(),
    // // LinebreakPlugin(),
    // // MarkdownPlugin(),
    BlockquotePlugin(),
    AutoScrollPlugin()
];

class Editor extends Component {
    static propTypes = {
        post: PropTypes.object,
        update: PropTypes.func
    };

    state = {
        value: Value.fromJSON({
            document: {
                nodes: [
                    {
                        object: "block",
                        type: "paragraph",
                        nodes: [
                            {
                                object: "text",
                                leaves: [
                                    {
                                        text: "A line of text in a paragraph."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        })
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

    onEditorChange = value => {
        this.setState({ value: value });
    };

    onPaste = (event, editor, next) => {
        scrollToCursor();
        const transfer = getEventTransfer(event);
        if (transfer.type != "html") return next();
        const { document } = html.deserialize(transfer.html);
        editor.insertFragment(document);
    };

    render() {
        return (
            <React.Fragment>
                <SlateEditor
                    plugins={plugins}
                    value={this.state.value}
                    onChange={this.onEditorChange}
                    onPaste={this.onPaste}
                    editorRef={this.editorRef}
                >
                    <StyledMenu menuRef={this.menuRef}>
                        <HeadingsButton type="heading-one" />
                        <HeadingsButton type="heading-two" />
                        <BoldButton />
                        <ItalicButton />
                        <UnderlineButton />
                        <LinkButton />
                        <BlockquoteButton />
                        <ListButtonBar />
                    </StyledMenu>
                    <StyledContent />
                    <StyledToolBar value={this.state.value}>
                        <HeadingsButton type="heading-three" />
                        <HeadingsButton type="heading-four" />
                        <HeadingsButton type="heading-five" />
                    </StyledToolBar>
                </SlateEditor>
            </React.Fragment>
        );
    }
}

export default Editor;
