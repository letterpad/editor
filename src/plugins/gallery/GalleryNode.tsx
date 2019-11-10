import React, { PureComponent } from "react";
import { Node, Editor, Block } from "slate";
import {
  getFigureNodesFromChildren,
  computeGrid,
  getImageRatiosFromFigures,
  calculateImageDimensions
} from "./GalleryUtils";
import { Row, Figure, Image, StyledButton } from "./GalleryNode.css";
import { handleFiles } from "./GalleryButton";

class GalleryNode extends PureComponent<{
  node: Node;
  editor?: Editor;
  attributes: any;
}> {
  state = { grid: [], selected: -1, imageCount: 0 };

  wrapperRef = React.createRef<HTMLDivElement>();
  inputRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    document.addEventListener("keyup", this.validateSelection);
    document.addEventListener("click", this.validateSelection);
    // We wil extract all the <figure> nodes from children.
    // Each figure node is suppose to contain an <img> tag.
    let figures = getFigureNodesFromChildren(this.props.children);
    // Compute a [3,X] grid in way that all images can fit without leaving
    // an empty space.
    const grid = computeGrid(figures);
    // set it in the state
    this.setState({ grid, imageCount: figures.length });
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.validateSelection);
    document.removeEventListener("click", this.validateSelection);
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

  getSnapshotBeforeUpdate() {
    return window.scrollY;
  }

  componentDidUpdate(_prevProps: any, _prevState: any, snapshot: number) {
    const { selected } = this.state;
    const { current } = this.wrapperRef;
    if (selected === -1 || !current) {
      return;
    }
    setTimeout(() => {
      window.scroll(0, snapshot);
    }, 30);
  }

  validateSelection = (e: KeyboardEvent | Event) => {
    if ("keyCode" in e && e.keyCode === 8 && this.state.selected >= 0) {
      return;
    }
    if ("target" in e && (e.target as any).tagName === "IMG") {
      return;
    }
    this.setState({ selected: -1 });
  };

  selectImage = (index: number) => {
    this.setState({ selected: index });
  };

  openFileExplorer = (e: any) => {
    e.preventDefault();
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
    return false;
  };

  mergeImageBlocks = (blocks: Block[]) => {
    if (this.props.editor) {
      const { editor } = this.props;
      blocks.forEach((block: Block) => {
        editor.insertNodeByKey(
          this.props.attributes["data-key"],
          this.state.imageCount,
          block
        );
      });
    }
  };

  render() {
    const { attributes } = this.props;

    // the grid contains figures, imgs and spans
    // grid > figures > [span, img, span]
    const images = this.state.grid.map(
      (figures: Block[], gridIndex: number) => {
        const ratios = getImageRatiosFromFigures(figures);

        const { newWidths, height } = calculateImageDimensions(ratios);
        return (
          <Row key={gridIndex}>
            {figures.map((figureNode: any, figureIdx: number) => {
              return figureNode.nodes.map((imgNode: any) => {
                // if the figure contains anything apart from img, return the node.
                if (imgNode.type !== "img") {
                  return (
                    <span key={imgNode.key}>
                      <span data-key={parseInt(imgNode.key) - 1} />
                      <span data-key={imgNode.key} />
                    </span>
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
    if (images.length > 0)
      return (
        <section ref={this.wrapperRef} {...attributes} data-id="plugin-gallery">
          <input
            onChange={e => handleFiles(e, this.props.editor)}
            multiple={true}
            ref={this.inputRef}
            type="file"
            style={{ display: "none" }}
          />
          <StyledButton onClick={this.openFileExplorer}>
            <span className="material-icons">add_photo_alt</span>
          </StyledButton>
          {images}
        </section>
      );

    return <section {...attributes}>{this.props.children}</section>;
  }
}

export default GalleryNode;
