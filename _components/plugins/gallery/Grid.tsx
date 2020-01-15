import React from "react";
import { Block } from "slate";
import {
  getImageRatiosFromFigures,
  calculateImageDimensions
} from "./GalleryUtils";
import { Row, Figure, Image } from "./GalleryNode.css";

interface IGridParams {
  data: Array<Array<Block>>;
  selected: number;
  onSelect: (imgNumber: number) => void;
}

export const Grid = ({ data, selected, onSelect }: IGridParams) => {
  // the grid contains figures, imgs and spans
  // grid > figures > [span, img, span]
  const images = data.map((figures: Block[], gridIndex: number) => {
    const ratios = getImageRatiosFromFigures(figures);

    const { newWidths, height } = calculateImageDimensions(ratios);
    return (
      <Row key={gridIndex} className="gallery-row">
        {figures.map((figureBlock: Block, figureIdx: number) => {
          return figureBlock.nodes.map((imgNode: any) => {
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
            const isSelected = selected === imgNumber;
            return (
              <Figure
                contentEditable={false}
                key={figureIdx}
                height={height}
                width={newWidths[figureIdx]}
                src={imgNode.data.get("src")}
                selected={isSelected}
                className={
                  "gallery-row-item " +
                  (isSelected ? "letterpad-image-active-for-delete" : "")
                }
                data-key={figureBlock.key}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  return onSelect(imgNumber);
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
  });
  return images;
};
