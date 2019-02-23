import { AutoScrollPlugin } from "./slatePlugin";
import { PluginConfig } from "..";

const autoscrollConfig: PluginConfig[] = [
  {
    type: "node",
    slatePlugin: AutoScrollPlugin
  }
];

export default autoscrollConfig;
