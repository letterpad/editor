import React from "react";
import { StyledGallery } from "./Gallery.css";
import { insertImage } from "./ImageUtils";
import { Editor } from "slate";

interface GalleryProps {
  onComplete: () => any;
  editor: Editor;
  query: string;
}
interface GalleryState {
  imgUrls: string[];
  currentIndex: number;
}

class Gallery extends React.Component<GalleryProps, GalleryState> {
  state = {
    imgUrls: [] as string[],
    currentIndex: -1
  };

  componentDidMount() {
    if (this.props.query === "") {
      return;
    }
    // the api key is not mine.
    fetch(
      "http://api.giphy.com/v1/gifs/search?q=" +
        this.props.query +
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
          imgUrls.push(item);
        });
        this.setState({ imgUrls });
      });
  }

  renderImageContent = (imageObj: any) => {
    return (
      <div
        key={imageObj.image}
        className="image-wrapper"
        onClick={() => {
          if (!this.props.editor) return;
          this.props.onComplete();
          insertImage(this.props.editor, imageObj.image);
        }}
      >
        <img src={imageObj.image} />
      </div>
    );
  };

  render() {
    const { imgUrls } = this.state;
    return (
      <StyledGallery className="x">
        <div className="gallery-container">
          <div className="gallery-grid">
            {imgUrls.map(this.renderImageContent)}
          </div>
        </div>
      </StyledGallery>
    );
  }
}

export default Gallery;
