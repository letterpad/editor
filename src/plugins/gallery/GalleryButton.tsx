import React from "react";
import Button from "../../components/Button";
import { EditorButtonComponent } from "..";
import { Block } from "slate";

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
const ImageButton: EditorButtonComponent = ({ editor, callbacks }) => {
  if (!editor) return <span />;

  const handleFiles = (e: any) => {
    const files = e.target.files;
    let attributes = [];
    for (let i = 0; i < files.length; ++i) {
      let file = files[i];
      attributes.push(
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
    Promise.all(attributes)
      .then(attrs => {
        const blocks: any = [];
        attrs.forEach(attrObj => {
          blocks.push(getBlock(attrObj));
        });
        const gallery = Block.create({ type: "section", nodes: blocks });
        editor.insertBlock(gallery);
      })
      .catch(function(errdims) {
        console.log(errdims);
      });
  };
  return (
    <>
      <input
        type="file"
        id="input"
        multiple
        style={{ display: "none" }}
        onChange={handleFiles}
      />
      <Button
        isActive={false}
        icon="photo_library"
        onMouseDown={e => {
          e.preventDefault();
          const hookCalled = callbacks.onButtonClick(e, "img", callbacks);
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
