import Immutable from "immutable";
import { DefaultDraftBlockRenderMap } from "draft-js";

// Here we define the default block. It can be a paragraph but symentec html
// does not allow div's to be placed inside p.
const blockRenderMap = Immutable.Map({
  unstyled: {
    element: "section",
  },
});

export const extendedBlockRenderMap =
  DefaultDraftBlockRenderMap.merge(blockRenderMap);
