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
import { PluginConfig } from ".";

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

export default pluginConfigs;
