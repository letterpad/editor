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

const pluginConfigs: PluginConfig[] = [
  ...audioConfig,
  ...italicConfig,
  ...autoscrollConfig,
  ...blockquoteConfig,
  ...boldConfig,
  ...codeblockConfig,
  ...headingsConfig,
  ...highlightConfig,
  ...imageConfig,
  ...linebreakConfig,
  ...linkConfig,
  ...listConfig,
  ...underlineConfig,
  ...youtubeConfig
];

export default pluginConfigs;
