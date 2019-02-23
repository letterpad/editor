import AutoReplace, { AutoReplaceParams } from "slate-auto-replace";
import { Plugin } from "slate-react";

import audioConfig from "./audio/config";
import autoscrollConfig from "./autoscroll/config";
import blockquoteConfig from "./blockquote/config";
import boldConfig from "./bold/config";
import codeblockConfig from "./codeblock/config";
import headingsConfig from "./headings/config";
import highlightConfig from "./highlight/config";
import imageConfig from "./image/config";
import italicConfig from "./italic/config";
import linebreakConfig from "./linebreak/config";
import linkConfig from "./link/config";
import listConfig from "./list/config";
import underlineConfig from "./underline/config";
import youtubeConfig from "./youtube/config";
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

export type PluginConfigs = (PluginConfig | PluginConfig[])[];

export const pluginConfigs: PluginConfigs = [
  audioConfig,
  autoscrollConfig,
  blockquoteConfig,
  boldConfig,
  codeblockConfig,
  headingsConfig,
  highlightConfig,
  imageConfig,
  italicConfig,
  linebreakConfig,
  linkConfig,
  listConfig,
  underlineConfig,
  youtubeConfig
] as any;

export const menuButtons: EditorButton[] = [];
export const toolbarButtons: EditorButton[] = [];

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

export const pluginsMap: PluginsMap = {
  node: {},
  mark: {},
  inline: {}
};

// Apply plugins
export const plugins: Plugin[] = [
  // PluginPrism({
  //     onlyIn: node => node.type === "code_block",
  //     getSyntax: node => node.data.get("syntax")
  // }),
];

pluginConfigs.forEach(config => {
  if (!Array.isArray(config)) {
    config = [config];
  }
  config.forEach(plugin => {
    if (plugin.menuButtons != null && Array.isArray(plugin.menuButtons)) {
      plugin.menuButtons.forEach(b => menuButtons.push(b));
    }
    const _menuButtons = plugin.menuButtons;
    if (Array.isArray(_menuButtons)) {
      _menuButtons.forEach(b => menuButtons.push(b));
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
