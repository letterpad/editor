import { IEmbedProvider } from "../../types";
import React from "react";

const URL_REGEX = new RegExp(
  "^https://gist.github.com/([a-zd](?:[a-zd]|-(?=[a-zd])){0,38})/(.*)$"
);

const iframeAttrs = {
  width: "100%",
  height: "200px",
  frameBorder: "0"
};
function getId(url: string) {
  const gistUrl = new URL(url);
  const id = gistUrl.pathname.split("/")[2];
  return id;
}

class Gist extends React.Component<IEmbedProvider> {
  iframeNode: HTMLIFrameElement | null = null;

  static ENABLED = [URL_REGEX];

  componentDidMount() {
    this.updateIframeContent();
  }

  get id() {
    if (!this.props.url) return "";
    return getId(this.props.url);
  }

  static getEmbedAttributes(url: string) {
    const id = getId(url);
    const gistLink = `https://gist.github.com/${id}.js`;
    const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`;
    const styles =
      "<style>*{ font-size:12px; } body { margin: 0; } .gist .blob-wrapper.data { max-height:150px; overflow:auto; }</style>";
    const iframeHtml = `<html><head><base target="_parent">${styles}</head><body>${gistScript}</body></html>`;

    return { ...iframeAttrs, src: "data:text/html;base64," + btoa(iframeHtml) };
  }

  updateIframeContent() {
    const iframe = this.iframeNode;
    if (!iframe || !this.props.url) return;
    const attrs = Gist.getEmbedAttributes(this.props.url);
    iframe.src = attrs.src;
  }

  render() {
    const id = this.id;

    return (
      <iframe
        ref={ref => {
          if (ref) {
            this.iframeNode = ref;
          }
        }}
        {...iframeAttrs}
        id={`gist-${id}`}
        title={`Github Gist (${id})`}
      />
    );
  }
}

export default Gist;
