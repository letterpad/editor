import React, { Component } from "react";
import { Node, Editor, Block } from "slate";
import {
  getFigureNodesFromChildren,
  computeGrid,
  getImageRatiosFromFigures,
  calculateImageDimensions
} from "./GalleryUtils";
import { Row, Figure, Image } from "./GalleryNode.css";

class GalleryNode extends Component<{
  node: Node;
  editor?: Editor;
  attributes: any;
}> {
  state = { grid: [], selected: -1, imageCount: 0 };

  wrapperRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    // We wil extract all the <figure> nodes from children.
    // Each figure node is suppose to contain an <img> tag.
    let figures = getFigureNodesFromChildren(this.props.children);
    // Compute a [3,X] grid in way that all images can fit without leaving
    // an empty space.
    const grid = computeGrid(figures);
    // set it in the state
    this.setState({ grid, imageCount: figures.length });
  }

  static getDerivedStateFromProps(props: any, state: any) {
    const figures = getFigureNodesFromChildren(props.children);
    if (state.imageCount === figures.length) {
      return null;
    }
    // recalculate the grid as the image count has changed
    // this can only happen, if one of the image has been deleted.
    const grid = computeGrid(figures);
    let { selected } = state;

    // if none of the image has been selected, return the grid
    if (selected === -1) {
      return { grid, imageCount: figures.length };
    }
    // If we we have reached here, its becuase one of the image has been deleted

    // if the last image was deleted then move the cursor to the previous index
    if (selected >= figures.length) {
      selected -= 1;
    }
    return { grid, selected, imageCount: figures.length };
  }

  componentDidUpdate() {
    const { selected } = this.state;
    const { current } = this.wrapperRef;
    if (selected === -1 || !current) {
      return;
    }
    // if any image is selected, then bring the focus there.
    const element = (current as Element).querySelectorAll("figure")[selected];
    if (!element) return;

    setTimeout(() => {
      try {
        element.scrollIntoView({ block: "center" });
      } catch (e) {
        element.scrollIntoView();
      }
    }, 30);
  }

  selectImage = (index: number) => {
    this.setState({ selected: index });
  };

  render() {
    const { attributes } = this.props;

    // the grid contains figures, imgs and spans
    // grid > figures > [span, img, span]
    const images = this.state.grid.map(
      (figures: Block[], gridIndex: number) => {
        const ratios = getImageRatiosFromFigures(figures);

        const { newWidths, height } = calculateImageDimensions(
          ratios,
          figures.length
        );
        return (
          <Row {...attributes} key={gridIndex}>
            {figures.map((figureNode: any, figureIdx: number) => {
              return figureNode.nodes.map((imgNode: any) => {
                // if the figure contains anything apart from img, return the node.
                if (imgNode.type !== "img") {
                  return (
                    <>
                      <span data-key={parseInt(imgNode.key) - 1} />
                      <span data-key={imgNode.key} />
                    </>
                  );
                }
                const imgNumber = figureIdx + gridIndex * 3;
                const isSelected = this.state.selected === imgNumber;
                return (
                  <Figure
                    contentEditable={false}
                    key={figureIdx}
                    height={height}
                    width={newWidths[figureIdx]}
                    src={imgNode.data.get("src")}
                    selected={isSelected}
                    className={
                      isSelected ? "letterpad-image-active-for-delete" : ""
                    }
                    data-key={figureNode.key}
                    onClick={(e: any) => {
                      e.preventDefault();
                      return this.selectImage(imgNumber);
                    }}
                  >
                    <Image
                      contentEditable={false}
                      height={height}
                      data-key={imgNode.key}
                      width={newWidths[figureIdx]}
                      src={imgNode.data.get("src")}
                    />
                  </Figure>
                );
              });
            })}
          </Row>
        );
      }
    );
    if (images.length > 0) return <div ref={this.wrapperRef}> {images} </div>;

    return <section {...this.props.attributes}>{this.props.children}</section>;
  }
}

export default GalleryNode;
