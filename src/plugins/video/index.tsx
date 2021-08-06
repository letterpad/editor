import createVideoPlugin from "@draft-js-plugins/video";
import videoStyles from "./video.module.css";

export const videoPlugin = createVideoPlugin({
  theme: videoStyles,
});


export const videoClicked = async (props: any, {getVideoUrl}) => {
  const {getEditorState, setEditorState} = props;
  const hook = (urls:string|string[]) => {
    if (!urls) return;
    if(typeof urls === "string") {
      urls = [urls]
    }
    urls.forEach(src => setEditorState(videoPlugin.addVideo(getEditorState(), { src })))
  }
  getVideoUrl(hook);
};