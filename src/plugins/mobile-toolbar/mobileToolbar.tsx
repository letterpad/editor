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
import { videoPlugin } from "../video";

interface Props {
  getImageUrl: ((insert: (url:string) => void) => void) 
  getVideoUrl: ((insert: (url:string) => void) => void) 
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
                onClick={async () => {
                  const hook = (src:string) => {
                    const state = externalProps.getEditorState();
                    if (!src) return;
                    const newEditorState = videoPlugin.addVideo(state, { src });
                    externalProps.setEditorState(newEditorState);
                  }
                  getVideoUrl(hook);
                }}
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
