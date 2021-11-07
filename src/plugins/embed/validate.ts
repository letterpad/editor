import isUrl from "is-url";
import { EmbedType } from "./types";

export const getEmbedType = (text: string) => {
  const verified = isUrl(text);

  if (!verified) {
    return {
      type: EmbedType.Unknown,
      src: null,
    };
  }

  if (text.startsWith("https://gist.github.com")) {
    return { type: EmbedType.Github, src: text + ".js" };
  }

  if (getYoutubeId(text)) {
    return {
      type: EmbedType.Youtube,
      src: `https://www.youtube.com/embed/${getYoutubeId(text)}`,
    };
  }

  return {
    type: EmbedType.Unknown,
    src: null,
  };
};

function getYoutubeId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  }
  return null;
}
