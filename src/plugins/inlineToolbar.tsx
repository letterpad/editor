import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
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
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";

import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import { IMAGE_BLOCK } from "./image";
import { LinkPluginButton } from "./anchor";

const InlineToolbar = () => {
  return (
    <InlineToolarHoc>
      {externalProps => {
        const block = getCurrentBlock(externalProps.getEditorState());

        if (block.getType() === IMAGE_BLOCK) {
          return (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <LinkPluginButton {...externalProps} />
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
