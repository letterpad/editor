import React, { Component } from "react";
import classnames from "classnames";
import styled from "styled-components";

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  &:after {
    content: "";
    flex-grow: 9999999;
    min-width: 200px;
    height: 0;
  }

  .photo-grid-wrapper {
    margin: 2px;
    background-color: violet;
    position: relative;
  }

  .photo-grid-wrapper i {
    display: block;
    padding-bottom: 100%;
  }
  .photo-grid-wrapper img {
    position: absolute;
    top: 0;
    width: 100%;
    vertical-align: bottom;
  }
`;

function getRealImgDimension(src: string) {
  if (typeof window !== "undefined") {
    let image = new Image();
    image.src = src;
    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve({
          src,
          width: image.width,
          height: image.height
        });
      };
      image.onerror = () => {
        reject();
      };
    });
  }
  return Promise.resolve({
    src,
    width: 1,
    height: 1
  });
}

function isString(str: string) {
  return typeof str === "string";
}

type PhotoType = {
  src: string;
  height: number;
  width: number;
};

interface ImageProps {
  className: string;
  unit: number;
  photos: any;
}

interface ImageState {
  photoInfos: any;
}

class PhotoGrid extends Component<ImageProps, ImageState> {
  static defaultProps = {
    unit: 200,
    photos: [
      {
        src:
          "https://images.wallpaperscraft.com/image/auto_sports_car_red_120693_1920x1080.jpg",
        width: 675,
        height: 200
      },
      {
        src:
          "https://images.wallpaperscraft.com/image/auto_sports_car_red_120693_1920x1080.jpg",
        width: 900,
        height: 500
      },
      {
        src:
          "https://images.wallpaperscraft.com/image/auto_sports_car_red_120693_1920x1080.jpg",
        width: 675,
        height: 900
      },
      {
        src:
          "https://images.wallpaperscraft.com/image/auto_sports_car_red_120693_1920x1080.jpg",
        width: 675,
        height: 900
      },

      {
        src:
          "https://images.wallpaperscraft.com/image/auto_side_view_sports_car_red_118923_1920x1080.jpg",
        width: 675,
        height: 900
      },

      {
        src:
          "https://images.wallpaperscraft.com/image/auto_side_view_sports_car_117332_1920x1080.jpg",
        width: 675,
        height: 900
      },
      {
        src:
          "https://i.pinimg.com/originals/6f/55/26/6f5526229f0b3f18e1cf64bd4eb5a62f.jpg",
        width: 675,
        height: 900
      }
    ]
  };

  state = { photoInfos: [] };

  renderPhotos = (photoInfos: any) => {
    const { unit, className } = this.props;
    const photoGridCls = classnames("photo-grid", className);
    return (
      <StyledGrid className={photoGridCls}>
        {photoInfos.map((photoInfo: PhotoType) => {
          const { width, height, src } = photoInfo;
          return (
            <div
              className="photo-grid-wrapper"
              key={src}
              style={{
                width: height ? (width / height) * unit : 0,
                flexGrow: height ? (width / height) * unit : 0
              }}
            >
              <i
                style={{
                  paddingBottom: `${width ? (height / width) * 100 : 0}%`
                }}
              />
              <img src={src} />
            </div>
          );
        })}
      </StyledGrid>
    );
  };

  loadImages() {
    this.props.photos.forEach((photo: any) =>
      getRealImgDimension(photo).then(photoInfo => {
        this.setState(prevState => {
          return { photoInfos: [...prevState.photoInfos, photoInfo] };
        });
      })
    );
  }

  componentDidMount() {
    const { photos } = this.props;
    if (isString(photos[0])) {
      this.loadImages();
    }
  }
  render() {
    const { photos } = this.props;
    if (isString(photos[0])) {
      // if(this.state)
      return this.renderPhotos(this.state.photoInfos);
    }
    return this.renderPhotos(photos);
  }
}

export default PhotoGrid;
