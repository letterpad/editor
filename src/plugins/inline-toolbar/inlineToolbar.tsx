import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import { ContentBlock, DraftBlockType, EditorState } from "draft-js";
import buttonStyles from "@plugins/inline-toolbar/buttonStyles.module.css";
import toolbarStyles from "@plugins/inline-toolbar/toolbarStyles.module.css";

export const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const InlineToolarHoc = inlineToolbarPlugin.InlineToolbar;

import { LinkPluginButton } from "@plugins/anchor";
import {
  ButtonBold,
  ButtonItalic,
  ButtonUnderline,
  ButtonHeadingOne,
  ButtonHeadingTwo,
  ButtonLink,
  ButtonHighlight,
} from "@plugins/buttons/Buttons";

import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import { EditorBlockTypes } from "@src/types";

const InlineToolbar = () => {
  return (
    <span className="inline-toolbar">
      <InlineToolarHoc>
        {(externalProps) => {
          const block = getCurrentBlock(
            externalProps.getEditorState()
          ) as ContentBlock;

          const blockType: DraftBlockType = block.getType();

          if (blockType === "atomic") {
            const type = block.get("data").get("type");
            if (type === EditorBlockTypes.Image) {
              return (
                <>
                  <ButtonBold {...externalProps} />
                  <ButtonItalic {...externalProps} />
                  <ButtonUnderline {...externalProps} />
                  <ButtonLink {...externalProps} />
                </>
              );
            }
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
              <ButtonHeadingOne {...externalProps} />
              <ButtonHeadingTwo {...externalProps} />
              <ButtonBold {...externalProps} />
              <ButtonItalic {...externalProps} />
              <ButtonUnderline {...externalProps} />
              <ButtonHighlight {...externalProps} />
              <LinkPluginButton {...externalProps} />
            </>
          );
        }}
      </InlineToolarHoc>
    </span>
  );
};

export default InlineToolbar;

const getCurrentBlock = (editorState: EditorState) => {
  if (editorState.getSelection) {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    return contentState.getBlockForKey(selectionState.getStartKey());
  }
};
