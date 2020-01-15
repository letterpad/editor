import React, { ReactNode } from "react";
import { Editor, RangeProperties, Range, Block, Node, Text } from "slate";
import scrollToCursor from "../../helper/scrollToCursor";

export const insertImage = (
  editor: Editor,
  src: string,
  align?: string,
  title?: string,
  target?: Range | RangeProperties
) => {
  scrollToCursor();
  if (target) {
    editor.select(target);
  }

  editor
    .insertInline({
      type: "img",
      data: { src, align, title }
    })
    .wrapBlock({ type: "figure", data: { src } })
    .moveAnchorToStartOfNextBlock()
    .moveFocusToStartOfNextBlock()
    .focus();
};

// compute the gallery grid. Each row will contain a max of 3 images.
export const computeGrid = (images: any[]) => {
  const maxRowSize = 3;
  const grid = [];
  for (let i = 0; i < images.length; i++) {
    if (i % maxRowSize === 0) {
      grid.push([images[i]]);
    } else {
      grid[grid.length - 1].push(images[i]);
    }
  }
  if (grid.length > 1 && grid[grid.length - 1].length === 1) {
    const lastImg = grid[grid.length - 1][0];
    if (lastImg.width < lastImg.height) {
      grid[grid.length - 2].push(lastImg);
      grid.pop();
    }
  }

  return grid;
};

/**
 * Get all the nodes which contain `figure` tag from children
 * @param children
 */
export const getFigureNodesFromChildren = (children: ReactNode) => {
  let figures: Block[] = [];
  React.Children.forEach(children, (element: any) => {
    figures = element.props.block
      .getBlocks()
      .toArray()
      .filter((block: Block) => block.type === "figure" && block.data);
  });
  return figures;
};

/**
 * Calculate the aspect ratio of images w/h contained in figure tag
 * @param figures
 */
export const getImageRatiosFromFigures = (figures: Block[]) => {
  return figures.map((data: Block) => {
    // get the image node from the `figure` node.
    const imgNode = data.nodes
      .filter((node: any) => {
        return node.type === "img";
      })
      .first();
    if (isTextNode(imgNode)) return 0;
    return imgNode.data.get("width") / imgNode.data.get("height");
  });
};

export function isTextNode(node: Node): node is Text {
  if (!node && Object.prototype.hasOwnProperty.call(node, "nodes")) {
    return true;
  }
  return false;
}

/**
 * Calculate the approprite width and height of an image in a way that
 * it can fill the grid without leaving any space
 * @param ratios An array containing the aspect ratio of all images
 * @returns {newWidths[], height[]}
 */
export const calculateImageDimensions = (ratios: number[]) => {
  const diffs = [];

  for (let i = 10; i < 500; i++) {
    let sum = 0;
    for (let j = 0; j < ratios.length; j++) {
      sum += ratios[j] * i;
    }
    if (sum < 1000) diffs.push(1000 - sum);
    else diffs.push(100000);
  }

  const min = Math.min(...diffs);
  const height = 10 + diffs.indexOf(min);
  const newWidths = ratios.map((r: any) => r * height);

  return { newWidths, height };
};
