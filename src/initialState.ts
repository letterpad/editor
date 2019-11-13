import { Value } from "slate";
import { EditorButton, PluginsMap, PluginConfig } from "./plugins";
import { Plugin as SlateReactPlugin } from "slate-react";
import AutoReplace from "slate-auto-replace";
import { initialEmptyValue } from "./value";

// Editor state
export interface LetterpadEditorState {
  menuButtons: EditorButton[];
  toolbarButtons: EditorButton[];
  toolbarActive: boolean;
  toolbarPosition: {
    top: number;
    left: number;
    width: number;
  };
  slateReactPlugins: SlateReactPlugin[];
  pluginsMap: PluginsMap;
  value: Value;
  html: string;
  hooks: object;
}
/**
 * Initial state for the Letterpad Editor
 */
export function getInitialState(
  pluginConfigs: PluginConfig[]
): LetterpadEditorState {
  const menuButtons: LetterpadEditorState["menuButtons"] = [];
  const toolbarButtons: LetterpadEditorState["toolbarButtons"] = [];
  const slateReactPlugins: LetterpadEditorState["slateReactPlugins"] = [];
  const pluginsMap: LetterpadEditorState["pluginsMap"] = {
    node: {},
    mark: {},
    inline: {}
  };
  const hooks = {};

  // Collect all necessary things
  for (const pluginConfig of pluginConfigs) {
    // collect menubuttons
    if (pluginConfig.menuButtons != null) {
      menuButtons.push(...pluginConfig.menuButtons);
    }

    // collect toolbar buttons
    if (pluginConfig.toolbarButtons != null) {
      toolbarButtons.push(...pluginConfig.toolbarButtons);
    }

    // collect slate react plugins
    if (pluginConfig.slatePlugin != null) {
      slateReactPlugins.push(pluginConfig.slatePlugin());
    }

    // collect slate react plugins from markdown config
    if (pluginConfig.markdown != null) {
      slateReactPlugins.push(AutoReplace(pluginConfig.markdown));
    }

    // collect all the plugin utility functions
    if (pluginConfig.hooks != null) {
      (hooks as any)[pluginConfig.name] = { ...pluginConfig.hooks };
    }

    let { identifier, renderType } = pluginConfig;
    if (identifier != null && renderType != null) {
      identifier.forEach(id => {
        pluginsMap[renderType as keyof PluginsMap][id] = {
          plugin: pluginConfig,
          is: id
        };
      });
    }
  }

  return {
    menuButtons,
    toolbarButtons,
    slateReactPlugins,
    pluginsMap,
    value: Value.fromJSON(initialEmptyValue),
    html: "",
    toolbarActive: false,
    hooks,
    toolbarPosition: {
      top: 0,
      left: 0,
      width: 0
    }
  };
}
