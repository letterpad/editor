import { AutoScrollPlugin } from "./main";
import { PluginConfig } from "..";

const autoscrollConfig: PluginConfig[] = [
  {
    type: "node",
    main: AutoScrollPlugin
  }
];

export default autoscrollConfig;
