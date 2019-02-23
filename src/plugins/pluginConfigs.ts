import { default as audioConfig } from "./audio/config";
import { default as italicConfig } from "./italic/config";
import { default as autoscrollConfig } from "./autoscroll/config";
import { default as blockquoteConfig } from "./blockquote/config";
import { default as boldConfig } from "./bold/config";
import { default as codeblockConfig } from "./codeblock/config";
import { default as headingsConfig } from "./headings/config";
import { default as highlightConfig } from "./highlight/config";
import { default as imageConfig } from "./image/config";
import { default as linebreakConfig } from "./linebreak/config";
import { default as linkConfig } from "./link/config";
import { default as listConfig } from "./list/config";
import { default as underlineConfig } from "./underline/config";
import { default as youtubeConfig } from "./youtube/config";
import { PluginConfigs } from ".";

const pluginConfigs: PluginConfigs = [
  audioConfig,
  italicConfig,
  autoscrollConfig,
  blockquoteConfig,
  boldConfig,
  codeblockConfig,
  headingsConfig,
  highlightConfig,
  imageConfig,
  linebreakConfig,
  linkConfig,
  listConfig,
  underlineConfig,
  youtubeConfig
];

export default pluginConfigs;
