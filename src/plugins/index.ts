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
import { sideToolbarPlugin } from "./sideToolbar";
import { inlineToolbarPlugin } from "./inline-toolbar/inlineToolbar";
import { createImagePlugin } from "./image";
import { linkPlugin } from "./anchor";

const listPlugin = createListPlugin();
const prismPlugin = createPrismPlugin({
  prism: Prism,
});

const focusPlugin = createFocusPlugin();
const imagePlugin = createImagePlugin();

interface Callbacks {
  onImageClick: () => Promise<string>;
}

export const plugins = (callbacks: Callbacks) => {
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
  ];
};
