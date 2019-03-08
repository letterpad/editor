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
  state = { grid: [], selected: "" };
  componentDidMount() {
    let figures = getFigureNodesFromChildren(this.props.children);
    const grid = computeGrid(figures);
    this.setState({ grid });
  }

  static getDerivedStateFromProps(props: any, state: any) {
    let figures = getFigureNodesFromChildren(props.children);
    const grid = computeGrid(figures);
    if (state.grid.length === grid.length) {
      return { grid, selected: state.selected };
    }
    let selected = state.selected;
    for (let i = 0; i < figures.length; i++) {
      const figure = figures[i];
      if (parseInt(figure.key) > parseInt(state.selected)) {
        selected = figures[i + 1].key;
        break;
      }
    }

    return { grid, selected };
  }
  componentDidUpdate() {
    if (this.props.editor && this.state.selected !== "") {
      const element = document.querySelector(
        `[data-key="${this.state.selected}"]`
      );
      if (element) {
        setTimeout(() => {
          console.log(element);
          element.scrollIntoView();
        }, 10);
      }
    }
  }

  getNextKey = () => {};

  selectImage = (key: string) => {
    this.setState({ selected: key });
  };

  render() {
    const { attributes } = this.props;

    const images = this.state.grid.map((figures: Block[], idx: number) => {
      const ratios = getImageRatiosFromFigures(figures);

      const { newWidths, height } = calculateImageDimensions(
        ratios,
        figures.length
      );

      return (
        <Row {...attributes} key={idx}>
          {figures.map((node: any, i: number) => {
            const imgNode = node.nodes
              .filter((node: any) => {
                return node.type === "img";
              })
              .first();
            const data = imgNode.data;
            const isSelected = this.state.selected === node.key;
            return (
              <Figure
                key={i}
                height={height}
                width={newWidths[i]}
                src={data.get("src")}
                selected={isSelected}
                className={
                  isSelected ? "letterpad-image-active-for-delete" : ""
                }
                data-key={node.key}
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  return this.selectImage(e.currentTarget.dataset.key);
                }}
              >
                <Image
                  height={height}
                  data-key={imgNode.key}
                  width={newWidths[i]}
                  src={data.get("src")}
                />
              </Figure>
            );
          })}
        </Row>
      );
    });
    if (images.length > 0) return images;

    return <section {...this.props.attributes}>{this.props.children}</section>;
  }
}

export default GalleryNode;
