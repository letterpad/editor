import React, { Component, useState } from "react";
import { StyledGallery, Container, StyledInput } from "./Gallery.css";
import { insertImage } from "./plugins/image/ImageUtils";

const ImageInput = React.forwardRef(({ editor, onSearch }, ref) => {
  const [url, setUrl] = useState("");

  return (
    <Container>
      <StyledInput
        ref={ref}
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyUp={e => {
          if (e.keyCode == 13) {
            // if the url is not empty
            if (url) {
              onSearch(url);
            } else {
              editor.focus();
            }
          }
        }}
        type="text"
        placeholder="Paste an Image link and press Enter"
      />
    </Container>
  );
});

class Gallery extends React.Component {
  state = {
    imgUrls: [],
    currentIndex: null,
    isActiveSearch: true,
    query: ""
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      fetch(
        "http://api.giphy.com/v1/gifs/search?q=" +
          this.state.query +
          "&api_key=dc6zaTOxFJmzC&limit=52"
      )
        .then(data => data.json())
        .then(({ data }) => {
          const imgUrls = [];
          data.map(item => {
            item.image = item.images.original.webp.replace(
              /.*\.giphy\.com/,
              "//i.giphy.com"
            );
            console.log("item :", item);
            imgUrls.push(item);
          });
          this.setState({ imgUrls, query: this.state.query });
        });
    }
  }

  renderImageContent = (imageObj, index) => {
    console.log("object :", imageObj);
    return (
      <div
        className="image-wrapper"
        onClick={e => {
          this.props.onComplete();
          insertImage(this.props.editor, imageObj.image);
        }}
      >
        <img src={imageObj.image} key={imageObj.image} />
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
    if (this.state.isActiveSearch) {
      return (
        <ImageInput
          {...this.props}
          onSearch={query => {
            this.setState({ isActiveSearch: false, query });
          }}
        />
      );
    }
    const { imgUrls } = this.state;
    return (
      <StyledGallery className="x">
        <div className="gallery-container">
          <div className="gallery-grid">
            {this.state.imgUrls.map(this.renderImageContent)}
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
