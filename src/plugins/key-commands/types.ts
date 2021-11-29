import { EditorState } from "draft-js";

export type StateTypes = {
  setEditorState?: (state: EditorState) => void;
  getEditorState?: () => EditorState;
  props?: Record<string, unknown>;
};
