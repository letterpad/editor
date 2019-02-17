import scrollToCursor from "../../helper/scrollToCursor";

export const insertImage = (editor, src, target) => {
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
}) => {
    return href
        ? change.setInline({
              type: "imageLink",
              isVoid: true,
              data: { src, title, href, openExternal }
          })
        : change.setInline({
              type: "image",
              isVoid: true,
              data: { src, title, openExternal }
          });
};

export const deleteInlineImage = ({ change }) => {
    return change.deleteBackward(1);
};

export const forceClickUploadButton = editor => {
    window.document
        .getElementById(
            `slate-image-plugin-button-${editor.props.outerState.uid}`
        )
        .click();
};
