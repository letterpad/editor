import * as React from "react";

import Frame, { iframeAttrs } from "../Frame";

import { IEmbedProvider } from "../../types";

const URL_REGEX = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i;

export default class YouTube extends React.Component<IEmbedProvider> {
  static ENABLED = [URL_REGEX];

  ref = React.createRef<HTMLIFrameElement>();

  static getEmbedAttributes(_url: string, matches: string[]) {
    const videoId = matches[1];
    return {
      ...iframeAttrs,
      src: `https://www.youtube.com/embed/${videoId}?modestbranding=1`
    };
  }

  render() {
    // @ts-ignore
    const { matches, attributes } = this.props;
    if (!matches) return <a {...attributes}></a>;
    const videoId = matches[1];

    return (
      <Frame
        forwardedRef={this.ref}
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
        // title={`YouTube (${videoId})`}
      />
    );
  }
}
