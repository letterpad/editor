import scrollToCursor from "../../helper/scrollToCursor";
import { Editor, RangeProperties, Range } from "slate";

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
    .wrapBlock({ type: "figure", data: { src } });
  // .moveAnchorToStartOfNextBlock()
  // .moveFocusToStartOfNextBlock()
  // .focus();
};

export const updateInlineImage = ({
  change,
  data: { src, title, href, openExternal }
}: {
  change: Editor;
  data: any;
}) => {
  return href
    ? change.setInlines({
        type: "imageLink",
        data: { src, title, href, openExternal }
      })
    : change.setInlines({
        type: "image",
        data: { src, title, openExternal }
      });
};

export const deleteInlineImage = ({ change }: { change: Editor }) => {
  return change.deleteBackward(1);
};

export const forceClickUploadButton = (editor: Editor) => {
  const el = window.document.getElementById(
    `slate-image-plugin-button-${(editor as any).props.outerState.uid}`
  );
  if (el) {
    el.click();
  }
};

export const splitUp = (arr: any, min: number, max: number) => {
  let arrs = [],
    size = 1;
  min = min || 1;
  max = max || min || 1;
  while (arr.length > 0) {
    size = Math.min(max, Math.floor(Math.random() * max + min));
    arrs.push(arr.splice(0, size));
  }
  return arrs;
};

export const randomIntBetween = (
  min: number,
  max: number // min and max included
) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// export const decorateNode = (node, editor, next) => {};
