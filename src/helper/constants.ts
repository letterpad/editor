import { pluginConfigs } from "../plugins";
import { MARK, nodeTypes } from "./util";

export const BLOCK_TAGS: { [key: string]: string } = {
  p: "p"
};

export const MARK_TAGS: { [key: string]: string } = {};

export const INLINE_TAGS: { [key: string]: string } = {};

export const getAllTags = () => {
  return { BLOCK_TAGS, MARK_TAGS, INLINE_TAGS };
};

pluginConfigs.filter(plugin => {
  // node or mark
  let { type, identifier } = plugin;
  if (!identifier) {
    return false;
  }
  identifier.forEach(id => {
    // if (set[0] === "span") return;
    if (type === nodeTypes.BLOCK) {
      BLOCK_TAGS[id] = id;
    }
    if (type === MARK) {
      MARK_TAGS[id] = id;
    }
    if (type === nodeTypes.INLINE) {
      INLINE_TAGS[id] = id;
    }
  });
});
