import scrollToCursor from "../../helper/scrollToCursor";
import { Editor, RangeProperties, Range } from "slate";

export const insertImage = (
  editor: Editor,
  src: string,
  target?: Range | RangeProperties
) => {
  scrollToCursor();
  if (target) {
    editor.select(target);
  }

  editor
    .insertInline({
      type: "img",
      data: { src }
    })
    .moveToEndOfBlock()
    .insertBlock("paragraph");
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
