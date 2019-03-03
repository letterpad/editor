import { Editor } from "slate";

export const insertVideo = (editor: Editor, type: string, src: string | null) =>
  editor.setBlocks({ type, data: { src } }).insertBlock("paragraph");

const parseVideo = (url: string) => {
  // - Supported YouTube URL formats:
  //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
  //   - http://youtu.be/My2FRPA3Gf8
  //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
  // - Supported Vimeo URL formats:
  //   - http://vimeo.com/25451551
  //   - http://player.vimeo.com/video/25451551
  // - Also supports relative URLs:
  //   - //player.vimeo.com/video/25451551

  url.match(
    /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  );
  let type = "";
  if (RegExp.$3.indexOf("youtu") > -1) {
    type = "youtube";
  } else if (RegExp.$3.indexOf("vimeo") > -1) {
    type = "vimeo";
  } else {
    return {
      type,
      id: ""
    };
  }

  return {
    type: type,
    id: RegExp.$6
  };
};

export const parseUrl = (url: string) => {
  if (url === "") return false;
  // check if this is youtube
  const videoObj = parseVideo(url);
  if (videoObj.type === "youtube") {
    return "//www.youtube.com/embed/" + videoObj.id;
  } else if (videoObj.type === "vimeo") {
    return "//player.vimeo.com/video/" + videoObj.id;
  }
  return "";
};
