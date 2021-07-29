import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import { ContentBlock, DraftBlockType } from "draft-js";
export const inlineToolbarPlugin = createInlineToolbarPlugin();
const InlineToolarHoc = inlineToolbarPlugin.InlineToolbar;
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  UnorderedListButton,
  OrderedListButton,
} from "@draft-js-plugins/buttons";

import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import { IMAGE_BLOCK } from "./image";
import { LinkPluginButton } from "./anchor";

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
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <LinkPluginButton {...externalProps} />
              </>
            );
          }
          if (blockType === "code-block") {
            return (
              <>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
              </>
            );
          }
          return (
            <>
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />

              <LinkPluginButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
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
