import React from "react";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";
import { Block, Editor } from "slate";

const getBlock = (props: any) => {
  return {
    object: "block",
    type: "figure",
    nodes: [
      {
        object: "inline",
        type: "img",
        data: {
          width: props.w,
          height: props.h,
          align: "wide",
          title: "",
          src: props.src
        }
      }
    ]
  };
};

export const handleFiles = (
  e: any,
  editor: Editor | undefined,
  callback?: Function
) => {
  if (!editor) return;
  const files = e.target.files;
  let imgElements = [];
  for (let i = 0; i < files.length; ++i) {
    let file = files[i];
    imgElements.push(
      new Promise((resolve, _) => {
        let src = URL.createObjectURL(file);
        let img = new Image();
        img.onload = () => {
          resolve({
            w: img.width,
            h: img.height,
            src: URL.createObjectURL(file)
          });
          URL.revokeObjectURL(src);
        };
        img.src = src;
      })
    );
  }
  createImageBlocks(imgElements, editor, callback);
};

export const createImageBlocks = (
  imgElements: Promise<{}>[],
  editor: Editor | undefined,
  callback?: Function
) => {
  if (!editor) return;
  Promise.all(imgElements)
    .then(attrs => {
      const blocks: any = [];
      attrs.forEach(attrObj => {
        blocks.push(getBlock(attrObj));
      });
      if (typeof callback === "function") {
        return callback(blocks);
      }
      const gallery = Block.create({ type: "section", nodes: blocks });
      editor.insertBlock(gallery);
    })
    .catch(function(errdims) {
      console.log(errdims);
    });
};

const ImageButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;

  return (
    <>
      <input
        type="file"
        id="input"
        multiple
        style={{ display: "none" }}
        onChange={e => handleFiles(e, editor)}
      />
      <Button
        isActive={false}
        icon="photo_library"
        onMouseDown={e => {
          e.preventDefault();
          const hookCalled = callbacks.onButtonClick(
            e,
            "plugin-gallery",
            callbacks
          );
          if (hookCalled) {
            return;
          }
          const input = document.getElementById("input");
          if (input) {
            input.click();
            // const files = (input as any).files;
          }
        }}
      />
    </>
  );
};

export default ImageButton;
