import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import { ContentBlock, DraftBlockType } from "draft-js";
export const inlineToolbarPlugin = createInlineToolbarPlugin();
const InlineToolarHoc = inlineToolbarPlugin.InlineToolbar;

import {
  ButtonBold,
  ButtonItalic,
  ButtonUnderline,
  ButtonHeadingOne,
  ButtonHeadingTwo,
  ButtonLink,
  ButtonHighlight,
} from "./buttons/Buttons";

import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import { IMAGE_BLOCK } from "./image";

const InlineToolbar = () => {
  return (
    <span className="inline-toolbar">
      <InlineToolarHoc>
        {externalProps => {
          const block: ContentBlock = getCurrentBlock(
            externalProps.getEditorState(),
          );
          const blockType: DraftBlockType = block.getType();

          if (blockType === IMAGE_BLOCK) {
            return (
              <>
                <ButtonBold {...externalProps} />
                <ButtonItalic {...externalProps} />
                <ButtonUnderline {...externalProps} />
                <ButtonLink {...externalProps} />
              </>
            );
          }
          if (blockType === "code-block") {
            return (
              <>
                <ButtonBold {...externalProps} />
                <ButtonItalic {...externalProps} />
              </>
            );
          }
          return (
            <>
              {/* <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} /> */}

              <ButtonHeadingOne {...externalProps} />
              <ButtonHeadingTwo {...externalProps} />
              <ButtonBold {...externalProps} />
              <ButtonItalic {...externalProps} />
              <ButtonUnderline {...externalProps} />
              <ButtonHighlight {...externalProps} />
              <ButtonLink {...externalProps} />
            </>
          );
        }}
      </InlineToolarHoc>
    </span>
  );
};

export default InlineToolbar;

const getCurrentBlock = editorState => {
  if (editorState.getSelection) {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
  }
};
