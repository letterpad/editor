import createVideoPlugin from "@draft-js-plugins/video";
import videoStyles from "./video.module.css";

export const videoPlugin = createVideoPlugin({
  theme: videoStyles,
});
