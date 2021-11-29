import { PluginFunctions } from "@draft-js-plugins/editor";
import { EditorCommand, EditorState, RichUtils } from "draft-js";
import { StateTypes } from "./types";

const handleKeyCommand = (
  command: EditorCommand,
  state: EditorState,
  store: StateTypes
) => {
  const newState = RichUtils.handleKeyCommand(state, command);
  if (newState && store.setEditorState) {
    store.setEditorState(newState);
    return "handled";
  }
  return "not-handled";
};

const createKeyCommand = () => {
  const store: StateTypes = {};
  return {
    handleKeyCommand: (cmd, state) => {
      handleKeyCommand(cmd, state, store);
    },
    initialize: (helpers: PluginFunctions) => {
      store.setEditorState = helpers.setEditorState;
      store.getEditorState = helpers.getEditorState;
      store.props = helpers.getProps() as Record<string, unknown>;
    },
  };
};

export default createKeyCommand;
