import Gist from "./Gist";
import React from "react";
import Spotify from "./Spotify";
import Vimeo from "./Vimeo";
import YouTube from "./YouTube";

const embeds = { Gist, Vimeo, Spotify, YouTube };
export default embeds;

export function getEmbedProvider(
  href: string
): { component: any; matches: string[] } {
  const keys = Object.keys(embeds);

  for (const key of keys) {
    const component = embeds[key];

    for (const host of component.ENABLED) {
      const matches = href.match(host);

      if (matches) return { component, matches };
    }
  }
}
