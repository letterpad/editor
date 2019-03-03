import React, { Component } from "react";
import { StyledGallery } from "./Gallery.css";
import { insertImage } from "./plugins/image/ImageUtils";

const imgUrls = [
  "https://source.unsplash.com/PC_lbSSxCZE/800x600",
  "https://source.unsplash.com/lVmR1YaBGG4/800x600",
  "https://source.unsplash.com/5KvPQc1Uklk/800x600",
  "https://source.unsplash.com/GtYFwFrFbMA/800x600",
  "https://source.unsplash.com/Igct8iZucFI/800x600",
  "https://source.unsplash.com/M01DfkOqz7I/800x600",
  "https://source.unsplash.com/MoI_cHNcSK8/800x600",
  "https://source.unsplash.com/M0WbGFRTXqU/800x600",
  "https://source.unsplash.com/s48nn4NtlZ4/800x600",
  "https://source.unsplash.com/E4944K_4SvI/800x600",
  "https://source.unsplash.com/F5Dxy9i8bxc/800x600",
  "https://source.unsplash.com/iPum7Ket2jo/800x600"
];

class Gallery extends React.Component {
  state = { currentIndex: null };

  renderImageContent = (src, index) => {
    return (
      <div
        className="image-wrapper"
        onClick={e => {
          this.props.onComplete();
          insertImage(this.props.editor, src);
        }}
      >
        <img src={src} key={src} />
      </div>
    );
  };
  openModal = (e, index) => {
    this.setState({ currentIndex: index });
  };
  closeModal = e => {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState({ currentIndex: null });
  };
  findPrev = e => {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }));
  };
  findNext = e => {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  };
  render() {
    return (
      <StyledGallery className="x">
        <div className="gallery-container">
          <div className="gallery-grid">
            {imgUrls.map(this.renderImageContent)}
          </div>
          <GalleryModal
            closeModal={this.closeModal}
            findPrev={this.findPrev}
            findNext={this.findNext}
            hasPrev={this.state.currentIndex > 0}
            hasNext={this.state.currentIndex + 1 < imgUrls.length}
            src={imgUrls[this.state.currentIndex]}
          />
        </div>
      </StyledGallery>
    );
  }
}

class GalleryModal extends Component {
  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnMount() {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.keyCode === 27) this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev) this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext) this.props.findNext();
  }
  render() {
    const {
      closeModal,
      hasNext,
      hasPrev,
      findNext,
      findPrev,
      src
    } = this.props;
    if (!src) {
      console.log("whut");
      return null;
    }
    return (
      <div>
        <div className="modal-overlay" onClick={closeModal} />
        <div isOpen={!!src} className="modal">
          <div className="modal-body">
            <a
              href="#"
              className="modal-close"
              onClick={closeModal}
              onKeyDown={this.handleKeyDown}
            >
              &times;
            </a>
            {hasPrev && (
              <a
                href="#"
                className="modal-prev"
                onClick={findPrev}
                onKeyDown={this.handleKeyDown}
              >
                &lsaquo;
              </a>
            )}
            {hasNext && (
              <a
                href="#"
                className="modal-next"
                onClick={findNext}
                onKeyDown={this.handleKeyDown}
              >
                &rsaquo;
              </a>
            )}
            <img src={src} />
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
