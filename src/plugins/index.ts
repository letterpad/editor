import { ComponentType, MouseEventHandler } from "react";
import { AutoReplaceParams } from "slate-auto-replace";
import { Plugin } from "slate-react";

import { Editor } from "slate";
import { Rule } from "slate-html-serializer";
import { default as codeblockConfig } from "./codeblock";
import { default as audioConfig } from "./audio";
import { default as autoscrollConfig } from "./autoscroll";
import { default as blockquoteConfig } from "./blockquote";
import { default as boldConfig } from "./bold";
import { default as headingsConfig } from "./headings";
import { default as highlightConfig } from "./highlight";
import { default as imageConfig } from "./image";
import { default as italicConfig } from "./italic";
import { default as linebreakConfig } from "./linebreak";
import { default as linkConfig } from "./link";
import { default as listConfig } from "./list";
import { default as underlineConfig } from "./underline";
import { default as embedConfig } from "./embed";
import { default as paragraphConfig } from "./paragraph";
import { default as galleryConfig } from "./gallery";

/**
 * Order of displaying in the menubar
 */
const pluginConfigs: PluginConfig[] = [
  ...codeblockConfig,
  ...paragraphConfig,
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
  ...embedConfig,
  ...galleryConfig
];

export interface EditorEventHandler {
  (event: Event, editor: Editor, next: () => any): any;
}

export type EditorButtonComponent = ComponentType<{
  editor: Editor;
  type?: string;
  onClick?: MouseEventHandler;
  callbacks: {
    [key: string]: any;
  };
  next: () => any;
}>;

export type PlaceholderComponent = ComponentType<{
  editor: Editor;
}>;

export interface EditorButton<P = any> {
  button: EditorButtonComponent;
  props?: P;
}

export interface PluginConfig {
  renderType?: string;
  identifier?: string[];
  menuButtons?: EditorButton[];
  toolbarButtons?: EditorButton[];
  render?: any;
  slatePlugin?: (options?: Plugin) => Plugin;
  markdown?: AutoReplaceParams;
  onPasteReturnHtml?: boolean;
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
