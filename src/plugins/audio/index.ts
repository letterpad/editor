import { AutoReplaceParams } from "slate-auto-replace";
import AudioButton from "./AudioButton";
import AudioNode from "./AudioNode";
import { AudioPlugin } from "./slatePlugin";
import { PluginConfig } from "..";

const onChange: AutoReplaceParams["change"] = (editor, _, matched) => {
  const src = matched.before[0].replace("[audio=", "");
  return editor
    .setBlocks({ type: "audio", data: { src: src } })
    .moveToEndOfBlock()
    .insertBlock("paragraph");
};

const audioConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [{ button: AudioButton }],
    render: AudioNode,
    identifier: ["audio"],
    slatePlugin: AudioPlugin,
    markdown: {
      trigger: "]",
      before: /(\[audio=?.*)/,
      change: onChange
    }
  }
];

export default audioConfig;
