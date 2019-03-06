import React, {
  SFC,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useState
} from "react";
import { Node, Editor } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";
import { NodeWrapper, Image, Figure, Row } from "./GalleryNode.css";

const GalleryNode: SFC<{
  attributes: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  node: Node;
  editor?: Editor;
  isFocused?: boolean;
}> = ({ attributes, node, children, editor }) => {
  if (isTextNode(node)) return null;
  const [images, setImages] = useState([] as any);
  const [selected, selectImage] = useState(-1);
  if (node.type === "section") {
    let figures: any = [];
    React.Children.forEach(children, (element: any) => {
      figures = element.props.block
        .getBlocksAsArray()
        .filter((block: any) => block.type === "figure" && block.data);
    });

    if (figures.length === 0)
      return <NodeWrapper {...attributes}>{children}</NodeWrapper>;

    const imageArrs = getImageAttrs(figures);
    if (imageArrs.length !== images.length) {
      setImages(imageArrs);
    }

    const grid = computeGrid(images);

    const imgs = grid.map((images, imgIdx) => {
      const ratios = images.map(
        (data: any) => data.get("width") / data.get("height")
      );
      const diffs = [];

      for (let i = 10; i < 500; i++) {
        let sum = 0;
        for (let j = 0; j < images.length; j++) {
          sum += ratios[j] * i;
        }
        if (sum < 1000) diffs.push(1000 - sum);
        else diffs.push(100000);
      }

      const min = Math.min(...diffs);
      const mul = 10 + diffs.indexOf(min);
      const newWidths = ratios.map((r: any) => r * mul);

      return (
        <Row size={images.length} {...attributes}>
          {images.map((data: any, i: number) => (
            <Figure
              height={mul}
              width={newWidths[i]}
              src={data.get("src")}
              selected={selected === data.get("src") + i}
              className={selected === data.get("src") + i ? "active" : ""}
              active={selected}
              data-key={data.key}
              onMouseOver={() => {
                selectImage(data.get("src") + i);
              }}
              onMouseOut={() => {
                selectImage(-1);
              }}
            >
              <Image
                height={mul}
                width={newWidths[i]}
                src={data.get("src")}
                onClick={(e: any) => {
                  selectImage(data.get("src") + i);
                }}
              />
            </Figure>
          ))}
        </Row>
      );
    });
    return imgs as any;
  }
  return null;
};

export default GalleryNode;

const getImageAttrs = (figures: any) => {
  // get image sizes from figureset
  const images = [] as any;
  figures.forEach((figure: any) => {
    // get the image node
    const imgNode = figure.nodes
      .filter((node: any) => {
        return node.type === "img";
      })
      .first();
    if (imgNode) {
      images.push(imgNode.data);
    }
  });

  return images;
};

const computeGrid = (images: any[]) => {
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
