import createVideoPlugin from "@draft-js-plugins/video";
import { TypeMediaInsert } from "@src/types";
import { StateTypes } from "@plugins/image/types";
import videoStyles from "./video.module.css";

export const videoPlugin = createVideoPlugin({
  theme: videoStyles,
});

export const videoClicked = async (
  props: Required<StateTypes>,
  { getVideoUrl }
) => {
  const { getEditorState, setEditorState } = props;

  const hook = (args: TypeMediaInsert | TypeMediaInsert[]) => {
    if (!Array.isArray(args)) {
      args = [args];
    }
    let state = getEditorState();
    for (let i = 0; i < args.length; i++) {
      const { src } = args[i];
      state = videoPlugin.addVideo(state, { src });
    }
    setEditorState(state);
  };
  getVideoUrl(hook);
};
