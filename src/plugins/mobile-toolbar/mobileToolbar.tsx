import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import { ContentBlock, DraftBlockType, EditorState } from "draft-js";
import buttonStyles from "../inline-toolbar/buttonStyles.module.css";
import toolbarStyles from "../inline-toolbar/toolbarStyles.module.css";
import { LinkPluginButton } from "../anchor";
export const mobileToolbarPlugin = createInlineToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const MobileToolarHoc = mobileToolbarPlugin.InlineToolbar;

import {
  ButtonBold,
  ButtonItalic,
  ButtonUnderline,
  ButtonHeadingOne,
  ButtonHeadingTwo,
  ButtonLink,
  ButtonVideo,
  ButtonImage,
  ButtonHighlight,
} from "../buttons/Buttons";

import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "./mobileToolbar.css";

import { imageClicked, IMAGE_BLOCK } from "../image";
import { videoClicked, videoPlugin } from "../video";
import { TypeMediaCallback } from "../../types";

interface Props {
  getImageUrl: TypeMediaCallback; 
  getVideoUrl: TypeMediaCallback; 
}

const MobileToolbar = ({ getImageUrl, getVideoUrl }: Props) => {
  return (
    <span className="mobile-toolbar">
      <MobileToolarHoc>
        {externalProps => {
          const block = getCurrentBlock(
            externalProps.getEditorState(),
          ) as ContentBlock;

          const blockType: DraftBlockType = block.getType();

          if (blockType === "atomic") {
            const type = block.get("data").get("type");
            if(type === IMAGE_BLOCK){
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
              <span
                onClick={() => imageClicked(externalProps, { getImageUrl })}
              >
                <ButtonImage {...externalProps} />
              </span>
              <span
                onClick={() => videoClicked(externalProps, {getVideoUrl})}
              >
                <ButtonVideo {...externalProps} />
              </span>
            </>
          );
        }}
      </MobileToolarHoc>
    </span>
  );
};

export default MobileToolbar;

const getCurrentBlock = (editorState: EditorState) => {
  if (editorState.getSelection) {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    return contentState.getBlockForKey(selectionState.getStartKey());
  }
};
