import { EditorState } from "draft-js";
import { highlightCodeOnChange } from "../utils/helper";
import { Action, ActionType } from "./types";

const reducer = (state: EditorState, action: Action) => {
  switch (action.type) {
    case ActionType.Set:
      return action.payload;
    case ActionType.HighlightCode: {
      return highlightCodeOnChange(action.payload);
    }
    default:
      return state;
  }
};

export default reducer;
