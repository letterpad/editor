import HeadingsNode from "./HeadingsNode";
import HeadingsKeyboardShortcut from "./HeadingsKeyboardShortcut";
import * as HeadingsUtils from "./HeadingsUtils";
import HeadingsButton from "./HeadingsButton";
import { hasBlock } from "../../helper/strategy";

const types = ["h1", "h1", "h3", "h4", "h5"];

const markdownChars = {
    "#": "h1",
    "##": "h2",
    "###": "h3",
    "####": "h4",
    "#####": "h5"
};
/* eslint-disable no-unused-vars */
const HeadingsPlugin = options => ({
    onKeyDown(event, editor, next) {
        if (event.key === "Enter") {
            var a = editor.value.blocks.get(0);
            const { type } = a.toJS();
            if (types.indexOf(type) >= 0) {
                let isActive = hasBlock(editor.value, type);
                if (isActive) {
                    event.preventDefault();
                    return editor.splitBlock().setBlocks("paragraph");
                }
            }
        }

        return HeadingsKeyboardShortcut(event, editor, next);
    }
});

export {
    HeadingsPlugin,
    HeadingsNode,
    HeadingsKeyboardShortcut,
    HeadingsUtils,
    HeadingsButton
};
