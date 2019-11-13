import React, { PureComponent } from "react";
import { Node, Editor, Block } from "slate";
import { getFigureNodesFromChildren, computeGrid } from "./GalleryUtils";
import { StyledButton } from "./GalleryNode.css";
import { handleFiles } from "./GalleryButton";
import { Grid } from "./Grid";

interface IGalleryNodeProps {
  node: Node;
  editor?: Editor;
  attributes: any;
  children: React.ReactNode;
}

interface IGalleryNodeState {
  grid: Array<Array<Block>>;
  selected: number;
  imageCount: number;
}

const BACKSPACE = 8;
class GalleryNode extends PureComponent<IGalleryNodeProps, IGalleryNodeState> {
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

  static getDerivedStateFromProps(
    props: IGalleryNodeProps,
    state: IGalleryNodeState
  ) {
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

  validateSelection = (e: KeyboardEvent | Event) => {
    if ("keyCode" in e && e.keyCode === BACKSPACE && this.state.selected >= 0) {
      const domNodeToDelete = document.querySelector(
        ".letterpad-image-active-for-delete"
      );
      if (!this.props.editor || !domNodeToDelete) return;
      const id = (domNodeToDelete as any).dataset.key;
      return this.props.editor.removeNodeByKey(id);
    }
    if ("target" in e && (e.target as any).tagName === "IMG") {
      return;
    }
    this.setState({ selected: -1 });
  };

  selectImage = (index: number) => {
    this.setState({ selected: index });
  };

  openFileExplorer = (e: React.MouseEvent) => {
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
    const images = Grid({
      data: this.state.grid,
      selected: this.state.selected,
      onSelect: this.selectImage
    });

    // wrap the images with section tag
    if (images.length > 0)
      return (
        <section ref={this.wrapperRef} {...attributes} data-id="plugin-gallery">
          <input
            onChange={e =>
              handleFiles(e, this.props.editor, this.mergeImageBlocks)
            }
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
