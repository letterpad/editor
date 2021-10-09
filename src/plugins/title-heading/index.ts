import { EditorState, RichUtils } from "draft-js";

const HEADING = "header-one";

export const createTitleHeadingPlugin = () => ({
  onChange: (editorState: EditorState) => {
    const currentContent = editorState.getCurrentContent();
    const firstBlockKey = currentContent.getBlockMap().first().getKey();
    const currentBlockKey = editorState.getSelection().getAnchorKey();
    const isFirstBlock = currentBlockKey === firstBlockKey;
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    const isHeading = currentBlockType === HEADING;
    if (isFirstBlock !== isHeading) {
      return RichUtils.toggleBlockType(editorState, HEADING);
    }
    return editorState;
  },
});
