import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import { ContentBlock, DraftBlockType, EditorState } from "draft-js";
export const mobileToolbarPlugin = createInlineToolbarPlugin();
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
  getImageUrl: () => Promise<string>;
}

const MobileToolbar = ({ getImageUrl }: Props) => {
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
              <ButtonLink {...externalProps} />
              <span
                onClick={() => imageClicked(externalProps, { getImageUrl })}
              >
                <ButtonImage {...externalProps} />
              </span>
              <span
                onClick={() => {
                  const newState = videoPlugin.addVideo(
                    externalProps.getEditorState(),
                    {
                      src: "https://www.youtube.com/watch?v=linlz7-Pnvw",
                    },
                  );

                  externalProps.setEditorState(newState);
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
