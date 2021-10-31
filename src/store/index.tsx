import { EditorState } from "draft-js";
import React, { useMemo } from "react";
import { Action } from "./types";
import reducer from "./reducer";
import useThunkReducer, { ThunkDispatch } from "../hooks/useThunkReducer";
import { setState } from "./actions";

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
  const [state, dispatch] = useThunkReducer(reducer, props.value);
  const value = {
    state,
    dispatch,
    setState: (state: EditorState) => {
      dispatch(setState(state));
    },
  };

  return useMemo(
    () => (
      <StoreContext.Provider value={value}>
        {props.children}
      </StoreContext.Provider>
    ),
    [value]
  );
}

const StoreContextConsumer = StoreContext.Consumer;

export { StoreContext, StoreContextProvider, StoreContextConsumer };
