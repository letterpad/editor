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
import { createTitleHeadingPlugin } from "./title-heading";
import { EditorPlugin } from "@draft-js-plugins/editor";

const listPlugin = createListPlugin();
const prismPlugin = createPrismPlugin({
  prism: Prism,
});

const focusPlugin = createFocusPlugin();
const imagePlugin = createImagePlugin();
const markdownPlugin = createMarkdownShortcutsPlugin();
const titleHeadingPlugin = createTitleHeadingPlugin();

export enum PluginNames {
  linkPlugin = "linkPlugin",
  videoPlugin = "videoPlugin",
  prismPlugin = "prismPlugin",
  sideToolbarPlugin = "sideToolbarPlugin",
  imagePlugin = "imagePlugin",
  markdownPlugin = "markdownPlugin",
  listPlugin = "listPlugin",
  inlineToolbarPlugin = "inlineToolbarPlugin",
  mobileToolbarPlugin = "mobileToolbarPlugin",
  titleHeadingPlugin = "titleHeadingPlugin",
  focusPlugin = "focusPlugin",
}

export const getPlugins = (ignoreList: PluginNames[] = []): EditorPlugin[] => {
  const availablePlugins = {
    linkPlugin,
    videoPlugin,
    prismPlugin,
    sideToolbarPlugin,
    imagePlugin,
    markdownPlugin,
    listPlugin,
    inlineToolbarPlugin,
    mobileToolbarPlugin,
    titleHeadingPlugin,
    focusPlugin,
  };

  for (const plugin of ignoreList) {
    delete availablePlugins[plugin];
  }

  return Object.values(availablePlugins);
};
