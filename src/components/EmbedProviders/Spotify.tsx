import * as React from "react";

import Frame, { iframeAttrs } from "../Frame";

import { IEmbedProvider } from "../../types";

const URL_REGEX = new RegExp("https?://open.spotify.com/(.*)$");

export default class Vimeo extends React.Component<IEmbedProvider> {
  static ENABLED = [URL_REGEX];

  ref = React.createRef<HTMLIFrameElement>();

  get pathname() {
    try {
      const parsed = new URL(this.props.url);
      return parsed.pathname;
    } catch (err) {
      return "";
    }
  }

  componentDidMount() {
    if (this.props.getEmbedAttributes) {
      const normalizedPath = this.pathname.replace(/^\/embed/, "/");
      this.props.getEmbedAttributes({
        ...iframeAttrs,
        src: `https://open.spotify.com/embed${normalizedPath}`
      });
    }
  }

  render() {
    const normalizedPath = this.pathname.replace(/^\/embed/, "/");

    return (
      <Frame
        width="300px"
        height="380px"
        forwardedRef={this.ref}
        src={`https://open.spotify.com/embed${normalizedPath}`}
      />
    );
  }
}
