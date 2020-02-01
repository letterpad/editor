import * as React from "react";

import Frame, { iframeAttrs } from "../Frame";

import { IEmbedProvider } from "../../types";

// import Frame, { iframeAttrs } from "../../../components/iframe";

// import { IEmbedProvider } from "../../../../types/types";

const URL_REGEX = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;

export default class Vimeo extends React.Component<IEmbedProvider> {
  static ENABLED = [URL_REGEX];

  ref = React.createRef<HTMLIFrameElement>();

  componentDidMount() {
    if (this.props.getEmbedAttributes && this.ref.current) {
      const { matches } = this.props;
      const videoId = matches[4];
      this.props.getEmbedAttributes({
        ...iframeAttrs,
        src: `https://player.vimeo.com/video/${videoId}?byline=0`
      });
    }
  }

  render() {
    const { matches } = this.props;
    const videoId = matches[4];

    return (
      <Frame
        forwardedRef={this.ref}
        src={`https://player.vimeo.com/video/${videoId}?byline=0`}
        // title={`Vimeo Embed (${videoId})`}
      />
    );
  }
}
