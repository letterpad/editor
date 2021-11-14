import { focusPlugin } from "@plugins/focus";
import { dividerPlugin } from "@plugins/divider";
import { createPlaceholderPlugin } from "@plugins/placeholder";

// markdown
import createMarkdownShortcutsPlugin from "draft-js-md-keyboard-plugin";

// li ul ol
import createListPlugin from "draft-js-list-plugin";

// toolbars (side and inline)
import { sideToolbarPlugin } from "@plugins/side-toolbar";
import { inlineToolbarPlugin } from "@plugins/inline-toolbar";
import { mobileToolbarPlugin } from "@plugins/mobile-toolbar";
import { createImagePlugin } from "@plugins/image";
import { linkPlugin } from "@plugins/anchor";
import createEmbedPlugin from "./embed/createEmbedPlugin";

const listPlugin = createListPlugin();

const placeholderPlugin = createPlaceholderPlugin({});
const embedPlugin = createEmbedPlugin({
  decorator: focusPlugin.decorator,
  options: {
    placeholderPlugin,
  },
});
const imagePlugin = createImagePlugin({ decorator: null });

const markdownPlugin = createMarkdownShortcutsPlugin();
// we need the right order
const pluginsArr = [
  { sideToolbarPlugin },
  { focusPlugin },
  { dividerPlugin },
  { imagePlugin },
  { markdownPlugin },
  { listPlugin },
  { inlineToolbarPlugin },
  { mobileToolbarPlugin },
  { placeholderPlugin },
  { embedPlugin },
  { linkPlugin },
];

export const getPlugins = () => {
  return {
    pluginsMap: getPluginsMap(pluginsArr),
    pluginsArr: getPluginsArr(pluginsArr),
  };
};

function getPluginsArr<T extends typeof pluginsArr>(plugins: T) {
  return plugins.map((plugin) => {
    return Object.values(plugin).pop() as T[keyof T];
  });
}

function getPluginsMap<T extends typeof pluginsArr>(plugins: T) {
  const pluginsMap = plugins.reduce<Record<keyof (keyof T), T>>((a, item) => {
    const name = Object.keys(item).pop() as keyof typeof item;
    a[name] = Object.values(item).pop();

    return a;
    //@ts-ignore
  }, {});

  return pluginsMap as Required<typeof pluginsMap>;
}
