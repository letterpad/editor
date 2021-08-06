import { videoPlugin } from "./video/index";
import createFocusPlugin from "@draft-js-plugins/focus";
import "@draft-js-plugins/focus/lib/plugin.css";

// markdown
import createMarkdownShortcutsPlugin from "draft-js-md-keyboard-plugin";
// code highlight
import Prism from "prismjs";
import createPrismPlugin from "draft-js-prism-plugin";
import "prismjs/themes/prism.css";

// li ul ol
import createListPlugin from "draft-js-list-plugin";

// toolbars (side and inline)
import { sideToolbarPlugin } from "./side-toolbar/sideToolbar";
import { inlineToolbarPlugin } from "./inline-toolbar/inlineToolbar";
import { mobileToolbarPlugin } from "./mobile-toolbar/mobileToolbar";
import { createImagePlugin } from "./image";
import { linkPlugin } from "./anchor";

const listPlugin = createListPlugin();
const prismPlugin = createPrismPlugin({
  prism: Prism,
});

const focusPlugin = createFocusPlugin();
const imagePlugin = createImagePlugin();

export const plugins = () => {
  return [
    linkPlugin,
    videoPlugin,
    prismPlugin,
    sideToolbarPlugin,
    focusPlugin,
    imagePlugin,
    createMarkdownShortcutsPlugin(),
    listPlugin,
    inlineToolbarPlugin,
    mobileToolbarPlugin,
  ];
};
