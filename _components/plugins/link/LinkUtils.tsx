import { Editor, Value } from "slate";

export const insertLinkStrategy = (editor: Editor) => {
  const { value } = editor;
  const { text } = value.fragment;

  if (hasLinks(value)) {
    let href = getLink(value).data.get("href");
    href = window.prompt("Change url:", href);
    unwrapLink(editor);

    if (href !== "") {
      return wrapLink(
        editor.insertText(text).moveFocusBackward(text.length),
        href
      );
    }
  } else {
    const href = window.prompt("Enter the URL of the link:");

    if (value.selection.isExpanded && !hasMultiBlocks(value)) {
      if (!href) return;
      wrapLink(editor, href).focus();
    } else {
      const { text } = editor.value.fragment;
      wrapLink(
        editor.insertText(text).moveFocusBackward(text.length),
        // TODO: WHAT GOES HERE?
        href || ""
      );
    }
  }

  return editor;
};

export const httpPreffixStrategy = (href: string) =>
  href.search("https?://") >= 0 ? href : `http://${href}`;

export const hasLinks = (value: Value) =>
  value.inlines.some(inline => inline != null && inline.type === "a");

export const getLink = (value: Value) =>
  value.inlines.filter(inline => inline != null && inline.type === "a").first();

export const hasMultiBlocks = (value: Value) => value.blocks.size > 1;

export const unlink = (editor: Editor) => editor.unwrapInline("a").focus();

const wrapLink = (editor: Editor, href: string) => {
  editor.wrapInline({
    type: "a",
    data: { href }
  });

  editor.moveToEnd();
  return editor;
};

const unwrapLink = (editor: Editor) => {
  editor.unwrapInline("a");
};
