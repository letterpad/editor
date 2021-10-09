import { EditorState } from "draft-js";

export enum ActionType {
  Set = "Set",
  HighlightCode = "highlightCode",
}

export type Action = { type: ActionType; payload: EditorState };
