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

export const computeGrid = (images: any[]) => {
  const grid = [];
  for (let i = 0; i < images.length; i++) {
    if (i % 3 === 0) {
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

export const getFigureNodesFromChildren = (children: ReactNode) => {
  let figures: Block[] = [];
  React.Children.forEach(children, (element: any) => {
    figures = element.props.block
      .getBlocksAsArray()
      .filter((block: Block) => block.type === "figure" && block.data);
  });
  return figures;
};

export const getImageRatiosFromFigures = (figures: Block[]) => {
  return figures.map((data: Block) => {
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
  if (Object.prototype.hasOwnProperty.call(node, "nodes")) {
    return true;
  }
  return false;
}

export const calculateImageDimensions = (ratios: number[], count: number) => {
  const diffs = [];

  for (let i = 10; i < 500; i++) {
    let sum = 0;
    for (let j = 0; j < count; j++) {
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
