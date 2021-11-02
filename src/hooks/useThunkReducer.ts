import { EditorState } from "draft-js";
import {
  Reducer,
  useReducer,
  ReducerState,
  ReducerAction,
  Dispatch,
} from "react";
import { Action } from "@store/types";

export type Initializer<R extends Reducer<EditorState, Action>, I> = (
  arg: (I & ReducerState<R>) | I
) => ReducerState<R>;
export type AsyncAction<S, A> = (dispatch: Dispatch<A>, state: S) => void;
export type ThunkDispatch<S, A> = (action: A | AsyncAction<S, A>) => void;

let globalState: unknown;

export default function useThunkReducer<
  R extends Reducer<EditorState, Action>,
  I
>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer?: Initializer<R, I>
): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>] {
  const [state, dispatch] = initializer
    ? useReducer(reducer, initializerArg, initializer)
    : useReducer(reducer, initializerArg);

  globalState = state;

  const thunkDispatch: ThunkDispatch<ReducerState<R>, ReducerAction<R>> = (
    action
  ) => {
    if (typeof action === "function") {
      return (action as AsyncAction<ReducerState<R>, ReducerAction<R>>)(
        dispatch,
        globalState as ReducerState<R>
      );
    }
    dispatch(action);
  };

  return [state, thunkDispatch];
}
