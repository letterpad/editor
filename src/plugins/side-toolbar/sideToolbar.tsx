// side toolbar (+)
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import "@draft-js-plugins/side-toolbar/lib/plugin.css";

import buttonStyles from "@plugins/inline-toolbar/buttonStyles.module.css";
import toolbarStyles from "@plugins/inline-toolbar/toolbarStyles.module.css";
import blockTypeSelectStyles from "./blockTypeSelectStyles.module.css";

import {
  ButtonCode,
  ButtonImage,
  ButtonBlockQuote,
  ButtonVideo,
  ButtonOrderedList,
  ButtonUnOrderedList,
  ButtonHorizontalLine,
} from "@plugins/buttons/Buttons";

import { imageClicked } from "@plugins/image";
import { videoClicked } from "@plugins/video";
import { callbacks } from "@src/callbacks";
import { addDivider } from "@plugins/divider";

export const sideToolbarPlugin = createSideToolbarPlugin({
  theme: {
    buttonStyles,
    toolbarStyles,
    blockTypeSelectStyles,
  },
});

const { SideToolbar } = sideToolbarPlugin;

const Sidebar = () => {
  const { onImageClick, onVideoClick } = callbacks.getAll();
  return (
    <div className="side-toolbar">
      <SideToolbar>
        {(externalProps) => (
          <div>
            <ButtonBlockQuote {...externalProps} />
            <ButtonCode {...externalProps} />
            <ButtonOrderedList {...externalProps} />
            <ButtonUnOrderedList {...externalProps} />

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
            <span
              onClick={() => {
                const newState = addDivider(externalProps.getEditorState(), {
                  type: "divider",
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
