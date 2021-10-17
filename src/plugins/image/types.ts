import { EditorState } from "draft-js";

export interface InsertImageType {
  src: string;
  caption: string;
  placeholderSrc?: string;
  width?: number | string;
  height?: number | string;
  getState: () => EditorState;
  setState: (state: EditorState) => void;
}

export type InsertImageAttrs = Omit<InsertImageType, "setState" | "getState">;
