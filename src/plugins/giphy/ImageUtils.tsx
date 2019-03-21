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

  if (editor.value.fragment.nodes.size > 1) {
    editor
      .moveAnchorToStartOfNextBlock()
      .moveFocusToStartOfNextBlock()
      .focus();
  }
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

export const hasFigureWrapper = (path: string) => {
  let node: Element | null = document.querySelector(`[data-key='${path}']`);
  if (!node) return false;
  let found = false;
  while (node && !found) {
    if (node!.tagName === "FIGURE") {
      found = true;
    }
    node = node!.parentElement;
  }
  return found;
};
