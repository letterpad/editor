import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
// side toolbar (+)
import "@draft-js-plugins/side-toolbar/lib/plugin.css";

import buttonStyles from "../inline-toolbar/buttonStyles.module.css";
import toolbarStyles from "../inline-toolbar/toolbarStyles.module.css";
import blockTypeSelectStyles from "./blockTypeSelectStyles.module.css";

import {
  ButtonCode,
  ButtonImage,
  ButtonBlockQuote,
  ButtonVideo,
  ButtonOrderedList,
  ButtonUnOrderedList,
} from "../buttons/Buttons";

import { imageClicked } from "../image";
import { videoClicked } from "../video";

export const sideToolbarPlugin = createSideToolbarPlugin({
  theme: {
    buttonStyles,
    toolbarStyles,
    blockTypeSelectStyles,
  },
});

const { SideToolbar } = sideToolbarPlugin;

interface Props {
  getImageUrl: ((insert: (url:string|string[]) => void) => void); 
  getVideoUrl: ((insert: (url:string|string[]) => void) => void); 
}

const Sidebar = ({ getImageUrl, getVideoUrl }: Props) => {
  return (
    <div className="side-toolbar">
      <SideToolbar>
        {externalProps => (
          <div>
            <ButtonBlockQuote {...externalProps} />
            <ButtonCode {...externalProps} />
            <ButtonOrderedList {...externalProps} />
            <ButtonUnOrderedList {...externalProps} />

            <span onClick={() => imageClicked(externalProps, { getImageUrl })}>
              <ButtonImage {...externalProps} />
            </span>
            <span
                onClick={() => videoClicked(externalProps, {getVideoUrl})}
              >
              <ButtonVideo {...externalProps} />
            </span>
          </div>
        )}
      </SideToolbar>
    </div>
  );
};
export default Sidebar;
