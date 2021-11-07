import { videoPlugin } from "@plugins/video";
import { focusPlugin } from "@plugins/focus";
import { dividerPlugin } from "@plugins/divider";
import { createPlaceholderPlugin } from "@plugins/placeholder";

// markdown
import createMarkdownShortcutsPlugin from "draft-js-md-keyboard-plugin";
// code highlight
import Prism from "prismjs";
import createPrismPlugin from "draft-js-prism-plugin";
import "prismjs/themes/prism.css";

// li ul ol
import createListPlugin from "draft-js-list-plugin";

// toolbars (side and inline)
import { sideToolbarPlugin } from "@plugins/side-toolbar";
import { inlineToolbarPlugin } from "@plugins/inline-toolbar";
import { mobileToolbarPlugin } from "@plugins/mobile-toolbar";
import { createImagePlugin } from "@plugins/image";
import { linkPlugin } from "@plugins/anchor";

const listPlugin = createListPlugin();
const prismPlugin = createPrismPlugin({
  prism: Prism,
});

const placeholderPlugin = createPlaceholderPlugin({});
const imagePlugin = createImagePlugin({ decorator: null });

const markdownPlugin = createMarkdownShortcutsPlugin();

const pluginsMap = {
  linkPlugin,
  videoPlugin,
  prismPlugin,
  sideToolbarPlugin,
  focusPlugin,
  dividerPlugin,
  imagePlugin,
  markdownPlugin,
  listPlugin,
  inlineToolbarPlugin,
  mobileToolbarPlugin,
  placeholderPlugin,
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
