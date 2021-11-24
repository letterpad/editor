// side toolbar (+)
import React from "react";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import "@draft-js-plugins/side-toolbar/lib/plugin.css";

import buttonStyles from "@plugins/inline-toolbar/buttonStyles.module.css";
import toolbarStyles from "@plugins/inline-toolbar/toolbarStyles.module.css";
import blockTypeSelectStyles from "./blockTypeSelectStyles.module.css";

import {
  ButtonCode,
  ButtonImage,
  ButtonBlockQuote,
  ButtonOrderedList,
  ButtonUnOrderedList,
  ButtonHorizontalLine,
  ButtonEmbedStyled,
} from "@plugins/buttons/Buttons";

import { imageClicked } from "@plugins/image";
import { callbacks } from "@src/callbacks";
import { addDivider } from "@plugins/divider";
import { EditorBlockTypes } from "@src/_types";
import { PluginsMap } from "@src/types";

export const sideToolbarPlugin = createSideToolbarPlugin({
  theme: {
    buttonStyles,
    toolbarStyles,
    blockTypeSelectStyles,
  },
});

const { SideToolbar } = sideToolbarPlugin;

const Sidebar = ({ plugins }: { plugins: PluginsMap }) => {
  const { onImageClick } = callbacks.getAll();
  const { PlaceholderButton } = plugins.placeholderPlugin;
  return (
    <div className="side-toolbar">
      <SideToolbar>
        {(externalProps) => (
          <div>
            <ButtonBlockQuote {...externalProps} />
            <ButtonCode {...externalProps} />
            <ButtonOrderedList {...externalProps} />
            <ButtonUnOrderedList {...externalProps} />
            <PlaceholderButton {...externalProps}>
              <ButtonEmbedStyled {...externalProps} />
            </PlaceholderButton>
            <span
              onClick={() =>
                imageClicked(externalProps, { getImageUrl: onImageClick })
              }
            >
              <ButtonImage {...externalProps} />
            </span>
            <span
              onClick={() => {
                const newState = addDivider(externalProps.getEditorState(), {
                  type: EditorBlockTypes.Divider,
                });
                externalProps.setEditorState(newState);
              }}
            >
              <ButtonHorizontalLine {...externalProps} />
            </span>
          </div>
        )}
      </SideToolbar>
    </div>
  );
};
export default Sidebar;
