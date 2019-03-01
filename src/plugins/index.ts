import { ComponentType } from "react";
import { AutoReplaceParams } from "slate-auto-replace";
import { Plugin } from "slate-react";

import { Editor } from "slate";
import { Rule } from "slate-html-serializer";
import { default as audioConfig } from "./audio";
import { default as autoscrollConfig } from "./autoscroll";
import { default as blockquoteConfig } from "./blockquote";
import { default as boldConfig } from "./bold";
import { default as codeblockConfig } from "./codeblock";
import { default as headingsConfig } from "./headings";
import { default as highlightConfig } from "./highlight";
import { default as imageConfig } from "./image";
import { default as italicConfig } from "./italic";
import { default as linebreakConfig } from "./linebreak";
import { default as linkConfig } from "./link";
import { default as listConfig } from "./list";
import { default as underlineConfig } from "./underline";
import { default as youtubeConfig } from "./youtube";

/**
 * Order of displaying in the menubar
 */
const pluginConfigs: PluginConfig[] = [
  ...codeblockConfig,

  ...boldConfig,
  ...italicConfig,
  ...underlineConfig,

  ...headingsConfig,

  ...linkConfig,
  ...highlightConfig,
  ...blockquoteConfig,
  ...listConfig,

  // others
  ...audioConfig,
  ...autoscrollConfig,
  ...imageConfig,
  ...linebreakConfig,
  ...youtubeConfig
];

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
  allowChildTransform?: boolean;
  tag?: string;
  identifier?: string[];
  menuButtons?: EditorButton[];
  toolbarButtons?: EditorButton[];
  render?: any;
  slatePlugin?: (options?: Plugin) => Plugin;
  markdown?: AutoReplaceParams;

  [key: string]: any;
  rules?: Rule;
}

export interface PluginOptions {
  [key: string]: any;
}

export interface PluginsMap {
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

export { pluginConfigs };
