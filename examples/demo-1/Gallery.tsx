import React, {
  Component,
  useState,
  FunctionComponent,
  KeyboardEventHandler
} from "react";
import { StyledGallery, Container, StyledInput } from "./Gallery.css";
import { insertImage } from "../../src/plugins/image/ImageUtils";
import { Editor } from "slate";

interface ImageInputProps {
  editor: Editor;
  onSearch: any;
}

const ImageInput: FunctionComponent<ImageInputProps> = React.forwardRef(
  ({ editor, onSearch }, ref: React.Ref<HTMLInputElement>) => {
    const [url, setUrl] = useState("");

    return (
      <Container>
        <StyledInput
          ref={ref}
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
          onKeyUp={(e: any) => {
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
  }
);

interface GalleryProps {
  onComplete: () => any;
  editor: Editor;
}
interface GalleryState {
  imgUrls: string[];
  currentIndex: number;
  isActiveSearch: boolean;
  query: string;
}

class Gallery extends React.Component<GalleryProps, GalleryState> {
  state = {
    imgUrls: [] as string[],
    currentIndex: -1,
    isActiveSearch: true,
    query: ""
  };

  componentDidUpdate(_: any, prevState: any) {
    if (prevState.query !== this.state.query) {
      fetch(
        "http://api.giphy.com/v1/gifs/search?q=" +
          this.state.query +
          "&api_key=dc6zaTOxFJmzC&limit=52"
      )
        .then(data => data.json())
        .then(({ data }) => {
          const imgUrls: string[] = [];
          data.map((item: any) => {
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

  renderImageContent = (imageObj: any) => {
    console.log("object :", imageObj);
    return (
      <div
        className="image-wrapper"
        onClick={() => {
          this.props.onComplete();
          insertImage(this.props.editor, imageObj.image);
        }}
      >
        <img src={imageObj.image} key={imageObj.image} />
      </div>
    );
  };
  openModal = (_: any, index: number) => {
    this.setState({ currentIndex: index });
  };
  closeModal = (e: Event) => {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState({ currentIndex: -1 });
  };
  findPrev = (e: Event) => {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }));
  };
  findNext = (e: Event) => {
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
          onSearch={(query: string) => {
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

class GalleryModal extends Component<{
  closeModal: (...args: any[]) => any;
  hasPrev: boolean;
  hasNext: boolean;
  findPrev: (...args: any[]) => any;
  findNext: (...args: any[]) => any;
  src: string;
}> {
  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyDown as any);
  }
  componentWillUnMount() {
    document.body.removeEventListener("keydown", this.handleKeyDown as any);
  }
  handleKeyDown: KeyboardEventHandler = e => {
    if (e.keyCode === 27) this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev) this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext) this.props.findNext();
  };
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
      return null;
    }
    return (
      <div>
        <div className="modal-overlay" onClick={closeModal} />
        <div className="modal">
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
