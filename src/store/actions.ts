import { EditorState } from "draft-js";
import { Action, ActionType } from "@store/types";
import { EditorProps } from "@src/types";
import { exportData } from "@utils/export";
import { Dispatch } from "react";

export const highlightCodeAction = (state: EditorState): Action => {
  return {
    type: ActionType.HighlightCode,
    payload: state,
  };
};

export const setState = (state: EditorState): Action => {
  return {
    type: ActionType.Set,
    payload: state,
  };
};

export const onChangeAction = (
  newState: EditorState,
  onChange: EditorProps["onChange"]
) => {
  return (dispatch: Dispatch<Action>) => {
    onChange(exportData(newState.getCurrentContent()));
    dispatch(setState(newState));
  };
};
