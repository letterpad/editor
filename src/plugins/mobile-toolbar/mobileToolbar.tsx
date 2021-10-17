import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import { ContentBlock, DraftBlockType } from "draft-js";
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
import { videoClicked } from "../video";
import { callbacks } from "../../callbacks";
import { getCurrentBlock } from "../utils";

const MobileToolbar = () => {
  const { onImageClick, onVideoClick } = callbacks.getAll();

  return (
    <span className="mobile-toolbar">
      <MobileToolarHoc>
        {(externalProps) => {
          const block = getCurrentBlock(
            externalProps.getEditorState()
          ) as ContentBlock;

          const blockType: DraftBlockType = block.getType();

          if (blockType === "atomic") {
            const type = block.get("data").get("type");
            if (type === IMAGE_BLOCK) {
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
                onClick={() =>
                  imageClicked(externalProps, { getImageUrl: onImageClick })
                }
              >
                <ButtonImage {...externalProps} />
              </span>
              <span
                onClick={() =>
                  videoClicked(externalProps, { getVideoUrl: onVideoClick })
                }
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
