import AutoReplace, { AutoReplaceParams } from "slate-auto-replace";
import { Plugin } from "slate-react";
import pluginConfigs from "./pluginConfigs";

import { ComponentType } from "react";
import { Editor } from "slate";
import { Rule } from "slate-html-serializer";

export interface EditorEventHandler {
  (event: Event, editor: Editor, next: () => any): any;
}

export type EditorButtonComponent = ComponentType<{
  editor: Editor;
  type?: string;
  callbacks: {
    [key: string]: any;
  };
  next: () => any;
}>;

export interface EditorButton<P = any> {
  button: EditorButtonComponent;
  props?: P;
}

export interface PluginConfig {
  type: string;

  tag?: string;
  identifier?: string[];
  menuButtons?: EditorButton[];
  toolbarButtons?: EditorButton[];

  slatePlugin?: (options?: Plugin) => Plugin;
  markdown?: AutoReplaceParams;

  [key: string]: any;
  rules?: Rule;
}

export interface PluginOptions {
  [key: string]: any;
}

const menuButtons: EditorButton[] = [];
const toolbarButtons: EditorButton[] = [];

interface PluginsMap {
  node: {
    [key: string]: {
      plugin: PluginConfig;
      is: string;
    };
  };
  mark: {
    [key: string]: {
      plugin: PluginConfig;
      is: string;
    };
  };
  inline: {
    [key: string]: {
      plugin: PluginConfig;
      is: string;
    };
  };
}

const pluginsMap: PluginsMap = {
  node: {},
  mark: {},
  inline: {}
};

// Apply plugins
const plugins: Plugin[] = [
  // PluginPrism({
  //     onlyIn: node => node.type === "code_block",
  //     getSyntax: node => node.data.get("syntax")
  // }),
];

pluginConfigs.forEach(plugin => {
  // collect menu buttons
  if (plugin.menuButtons != null) {
    plugin.menuButtons.forEach(b => menuButtons.push(b));
  }

  // collect toolbar buttons
  if (plugin.toolbarButtons != null) {
    plugin.toolbarButtons.forEach(b => toolbarButtons.push(b));
  }

  // execute main if available
  if (plugin.slatePlugin) {
    plugins.push(plugin.slatePlugin());
  }

  // render markdown if available
  if (plugin.markdown) {
    plugins.push(AutoReplace(plugin.markdown));
  }

  /**
   * create a map of plugins so that its easy to identify based on node/mark
   * {
   *   mark: {
   *     bold: {
   *       is: "b",
   *       plugin: { ...config }
   *   }
   *   },
   *   node: {
   *      blockquote: {
   *        is: "blockquote",
   *        plugin: { ...config }
   *      }
   *   }
   * }
   */
  let { identifier, tag } = plugin;
  if (identifier != null && tag != null) {
    identifier.forEach(id => {
      pluginsMap[tag as keyof PluginsMap][id] = {
        plugin,
        is: id
      };
    });
  }
});
console.log("menuButtons :", menuButtons);
export { pluginConfigs, pluginsMap, menuButtons, toolbarButtons, plugins };
