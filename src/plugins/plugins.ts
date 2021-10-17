import { videoPlugin } from "./video";
// import createFocusPlugin from "@draft-js-plugins/focus";
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
import { sideToolbarPlugin } from "./side-toolbar";
import { inlineToolbarPlugin } from "./inline-toolbar";
import { mobileToolbarPlugin } from "./mobile-toolbar";
import { createImagePlugin } from "./image";
import { linkPlugin } from "./anchor";

const listPlugin = createListPlugin();
const prismPlugin = createPrismPlugin({
  prism: Prism,
});

// const focusPlugin = createFocusPlugin();
const imagePlugin = createImagePlugin();
const markdownPlugin = createMarkdownShortcutsPlugin();

const pluginsMap = {
  linkPlugin,
  videoPlugin,
  prismPlugin,
  sideToolbarPlugin,
  imagePlugin,
  markdownPlugin,
  listPlugin,
  inlineToolbarPlugin,
  mobileToolbarPlugin,
  // focusPlugin,
};

const preparePluginsSingleton = () => {
  const closureFn = () => {
    return {
      pluginsArray: Object.values(pluginsMap),
      pluginsMap,
    };
  };

  return closureFn;
};

export const getPlugins = preparePluginsSingleton();
