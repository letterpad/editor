import * as React from "react";

const URL_REGEX = new RegExp(
  "^https://gist.github.com/([a-zd](?:[a-zd]|-(?=[a-zd])){0,38})/(.*)$"
);

const iframeAttrs = {
  width: "100%",
  height: "200px",
  frameBorder: "0"
};

class Gist extends React.Component<{ url: string; getEmbedSrc: Function }> {
  iframeNode: HTMLIFrameElement;

  static ENABLED = [URL_REGEX];

  componentDidMount() {
    this.updateIframeContent();
  }

  get id() {
    const gistUrl = new URL(this.props.url);
    return gistUrl.pathname.split("/")[2];
  }

  updateIframeContent() {
    const id = this.id;
    const iframe = this.iframeNode;
    if (!iframe) return;

    const gistLink = `https://gist.github.com/${id}.js`;
    const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`;
    const styles =
      "<style>*{ font-size:12px; } body { margin: 0; } .gist .blob-wrapper.data { max-height:150px; overflow:auto; }</style>";
    const iframeHtml = `<html><head><base target="_parent">${styles}</head><body>${gistScript}</body></html>`;
    this.iframeNode.src = "data:text/html;base64," + btoa(iframeHtml);

    if (this.props.getEmbedSrc) {
      //@ts-ignore
      this.props.getEmbedSrc(btoa(iframeHtml));
    }
  }

  render() {
    const id = this.id;

    return (
      <iframe
        ref={ref => {
          this.iframeNode = ref;
        }}
        {...iframeAttrs}
        id={`gist-${id}`}
        title={`Github Gist (${id})`}
      />
    );
  }
}

export default Gist;
