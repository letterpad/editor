import React from "react";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import { ContentBlock, DraftBlockType } from "draft-js";
import buttonStyles from "@plugins/inline-toolbar/buttonStyles.module.css";
import toolbarStyles from "@plugins/inline-toolbar/toolbarStyles.module.css";
import { LinkPluginButton } from "@plugins/anchor";
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
  ButtonImage,
  ButtonHighlight,
} from "@plugins/buttons/Buttons";

import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "./mobileToolbar.css";

import { imageClicked } from "@plugins/image";
import { callbacks } from "@src/callbacks";
import { EditorBlockTypes } from "@src/_types";
import { getCurrentBlock } from "@plugins/utils";

const MobileToolbar = () => {
  const { onImageClick } = callbacks.getAll();

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
              <span
                onClick={() =>
                  imageClicked(externalProps, { getImageUrl: onImageClick })
                }
              >
                <ButtonImage {...externalProps} />
              </span>
            </>
          );
        }}
      </MobileToolarHoc>
    </span>
  );
};

export default MobileToolbar;
