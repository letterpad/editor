import { AutoReplaceParams } from "slate-auto-replace";
import { ListPlugin } from "./slatePlugin";
import ListButtonBar from "./ListButtonBar";
import { RenderNode } from "./RenderNode";
import { PluginConfig } from "..";
import { nodeTypes } from "../../helper/util";

const onChange: AutoReplaceParams["change"] = (editor, _, matches) => {
  if (matches.before[0] === "*") {
    return editor.setBlocks("li").wrapBlock("ul");
  } else if (matches.before[0] === "1.") {
    return editor.setBlocks("li").wrapBlock("ol");
  } else {
    return editor.setBlocks("li").wrapBlock("ul");
  }
};

const identifier = ["li", "ol", "ul"];

const listConfig: PluginConfig[] = [
  {
    renderType: "node",
    menuButtons: [{ button: ListButtonBar }],
    toolbarButtons: [],
    render: ({ next, ...props }: { next: () => {}; [key: string]: any }) => {
      return RenderNode(props.node.type, props);
    },
    identifier,
    slatePlugin: ListPlugin,
    markdown: {
      trigger: "space",
      before: /^(\*|-|1\.)$/,
      change: onChange
    },
    rules: {
      serialize: (obj, children) => {
        if (obj.object !== nodeTypes.BLOCK) {
          return;
        }
        const props = { children, node: obj, attributes: {} };
        if (identifier.indexOf(obj.type) >= 0) {
          return RenderNode(props.node.type, props);
        }
      },
      deserialize: (el, next) => {
        const type = el.tagName.toLowerCase();
        if (identifier.indexOf(type) >= 0) {
          return {
            object: nodeTypes.BLOCK,
            type: type,
            data: {
              className: el.getAttribute("class"),
              style: el.getAttribute("style")
            },
            nodes: next(el.childNodes)
          };
        }
      }
    }
  }
];

export default listConfig;
