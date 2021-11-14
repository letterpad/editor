import { EditorState } from "draft-js";
import React from "react";
import { Action } from "@store/types";
import reducer from "@store/reducer";
import useThunkReducer, { ThunkDispatch } from "@hooks/useThunkReducer";
import { setState } from "@store/actions";

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

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

const StoreContextConsumer = StoreContext.Consumer;

export { StoreContext, StoreContextProvider, StoreContextConsumer };
