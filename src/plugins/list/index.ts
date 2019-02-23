import { AutoReplaceParams } from "slate-auto-replace";
import { ListPlugin } from "./slatePlugin";
import ListButtonBar from "./ListButtonBar";
import { RenderNode } from "./RenderNode";
import { PluginConfig } from "..";

const onChange: AutoReplaceParams["change"] = (editor, _, matches) => {
  if (matches.before[0] === "*") {
    return editor.setBlocks("li").wrapBlock("ol");
  } else {
    return editor.setBlocks("li").wrapBlock("ul");
  }
};

const listConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [{ button: ListButtonBar }],
    toolbarButtons: [],
    render: ({ next, ...props }: { next: () => {}; [key: string]: any }) => {
      return RenderNode(props.node.type, props);
    },
    identifier: ["li", "ol", "ul"],
    slatePlugin: ListPlugin,
    markdown: {
      trigger: "space",
      before: /^(\*|-)$/,
      change: onChange
    }
  }
];

export default listConfig;
