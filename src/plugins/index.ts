import AutoReplace, { AutoReplaceParams } from "slate-auto-replace";
import { Plugin } from "slate-react";
import pluginConfigs from "./pluginConfigs";

import { ComponentType } from "react";
import { Editor } from "slate";

export interface EditorEventHandler {
  (event: Event, editor: Editor, next: () => any): any;
}

export type EditorButtonComponent = ComponentType<{
  editor: Editor;
  type: string;
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

  main?: (options?: any) => Plugin;
  markdown?: AutoReplaceParams;

  [key: string]: any;
}

export interface PluginOptions {
  [key: string]: any;
}

export type PluginConfigs = PluginConfig[][];

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

pluginConfigs.forEach(config => {
  config.forEach(plugin => {
    if (plugin.menuButtons != null && Array.isArray(plugin.menuButtons)) {
      plugin.menuButtons.forEach(b => menuButtons.push(b));
    }
    const _menuButtons = plugin.menuButtons;
    if (Array.isArray(_menuButtons)) {
      _menuButtons.forEach(buttonObj => {
        menuButtons.push(buttonObj);
      });
    }
    const _toolbarButtons = plugin.toolbarButtons;
    if (Array.isArray(_toolbarButtons)) {
      _toolbarButtons.forEach(b => toolbarButtons.push(b));
    }
    if (plugin.main) {
      plugins.push(plugin.main());
    }
    if (plugin.markdown) {
      plugins.push(AutoReplace(plugin.markdown));
    }

    /*|------------------------------------------------------------------------------
        * create a map of plugins so that its easy to identify based on node/mark
        * {
        *   mark: {
        *     bold: {
        *       is: "b",
        *       plugin: { ...config }
                }
        *   },
        *   node: {
        *      blockquote: {
        *        is: "blockquote",
        *        plugin: { ...config }
        *      }
        *   }
        * }
        *|------------------------------------------------------------------------------*/
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
});

export { pluginConfigs, pluginsMap, menuButtons, toolbarButtons, plugins };
