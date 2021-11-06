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
  ButtonOrderedList,
  ButtonUnOrderedList,
  ButtonHorizontalLine,
} from "@plugins/buttons/Buttons";

import { imageClicked } from "@plugins/image";
import { callbacks } from "@src/callbacks";
import { addDivider } from "@plugins/divider";
import { EditorBlockTypes } from "@src/types";

export const sideToolbarPlugin = createSideToolbarPlugin({
  theme: {
    buttonStyles,
    toolbarStyles,
    blockTypeSelectStyles,
  },
});

const { SideToolbar } = sideToolbarPlugin;

const Sidebar = () => {
  const { onImageClick } = callbacks.getAll();
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
