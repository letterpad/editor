import React from "react";

export default class Gist extends React.PureComponent<{
  id: string;
  file?: string | null;
  attributes: any;
  children: any;
}> {
  iframeRef = React.createRef<HTMLIFrameElement>();

  componentDidMount() {
    this._updateIframeContent();
  }

  componentDidUpdate() {
    this._updateIframeContent();
  }

  _defineUrl() {
    const { id, file } = this.props;

    const fileArg = file ? `?file=${file}` : "";

    return `https://gist.github.com/${id}.js${fileArg}`;
  }

  _updateIframeContent() {
    const { id, file } = this.props;

    const iframe = this.iframeRef.current;
    if (!iframe) return false;
    let doc = (iframe as any).document;
    if (iframe.contentDocument) doc = iframe.contentDocument;
    else if (iframe.contentWindow) doc = iframe.contentWindow.document;

    const gistLink = this._defineUrl();
    const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`;
    const styles = "<style>*{font-size:12px;}</style>";
    const elementId = file ? `gist-${id}-${file}` : `gist-${id}`;
    const resizeScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`;
    const iframeHtml = `<html><head><base target="_parent">${styles}</head><body ${resizeScript}>${gistScript}</body></html>`;

    doc.open();
    doc.writeln(iframeHtml);
    doc.close();
  }

  render() {
    const { id, file, children } = this.props;

    return (
      <iframe
        {...this.props.attributes}
        ref={this.iframeRef}
        width="100%"
        frameBorder={0}
        id={file ? `gist-${id}-${file}` : `gist-${id}`}
      >
        {" "}
        {children}
      </iframe>
    );
  }
}
