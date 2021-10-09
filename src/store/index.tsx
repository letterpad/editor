import { EditorState } from "draft-js";
import React from "react";
import { Action } from "./types";
import reducer from "./reducer";
import useThunkReducer, { ThunkDispatch } from "../hooks/useThunkReducer";

const initialState: EditorState = EditorState.createEmpty();

const StoreContext = React.createContext<{
  state: EditorState;
  dispatch: ThunkDispatch<EditorState, Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function StoreContextProvider(
  props: React.PropsWithChildren<{ value: EditorState }>
) {
  let [state, dispatch] = useThunkReducer(reducer, props.value);
  let value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

let StoreContextConsumer = StoreContext.Consumer;

export { StoreContext, StoreContextProvider, StoreContextConsumer };
