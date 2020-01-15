import { Editor } from "slate";

export const insertEmbed = (editor: Editor, type: string, embedObj: {}) =>
  editor.setBlocks({ type, data: { ...embedObj } }).insertBlock("p");

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

const iframeRegex = /^\s*<iframe (.*?)(\/?>|><\/iframe>)\s*$/;
const leftWhitespaceRe = /^\s+/;

export const parseUrl = (embedString: string) => {
  if (embedString === "") return {};
  // check if this is youtube
  const embedObj = parseVideo(embedString);
  if (embedString.startsWith("<iframe")) {
    // parse the iframe string
    const matches = embedString.match(iframeRegex);

    if (matches && matches.length > 0) {
      const attributesRaw = matches[1];
      let attributesRemaining = attributesRaw.replace(leftWhitespaceRe, "");
      const attrs: any = {};
      while (attributesRemaining.length > 0) {
        const attrMatch = attributesRemaining.match(
          /^([\w\-]+)(=("([^"]*)"|'([^']*)'|(\S*)))?/
        );

        if (attrMatch) {
          attrs[attrMatch[1]] =
            attrMatch[4] || attrMatch[5] || attrMatch[6] || true;

          attributesRemaining = attributesRemaining
            .substring(attrMatch[0].length)
            .replace(leftWhitespaceRe, "");
        }
      }
      if (attrs.allowfullscreen) {
        attrs.allowFullScreen = true;
      }
      return attrs;
    }
  }

  if (embedObj.type === "youtube") {
    return { src: "//www.youtube.com/embed/" + embedObj.id };
  } else if (embedObj.type === "vimeo") {
    return { src: "//player.vimeo.com/video/" + embedObj.id };
  }
  return { src: embedString };
};

export const parseGistUrl = (url: string) => {
  var parser = document.createElement("a");
  parser.href = url;

  const id = parser.pathname.split("/")[2];
  let params = new URLSearchParams(parser.search);
  const file = params.get("file");
  return { id, file };
};
