import React, { useState, FunctionComponent } from "react";
import { StyledGallery, Container, StyledInput } from "./Gallery.css";
import { insertImage } from "../../src/plugins/image/ImageUtils";
import { Editor } from "slate";

interface ImageInputProps {
  editor: Editor;
  onSearch: any;
}

const ImageInput: FunctionComponent<ImageInputProps> = React.forwardRef(
  ({ editor, onSearch }: ImageInputProps, ref: React.Ref<HTMLInputElement>) => {
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
          placeholder="Enter a keyword and search for images"
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
    return (
      <StyledGallery className="x">
        <div className="gallery-container">
          <div className="gallery-grid">
            {this.state.imgUrls.map(this.renderImageContent)}
          </div>
        </div>
      </StyledGallery>
    );
  }
}

export default Gallery;
