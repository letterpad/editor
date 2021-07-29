import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
// side toolbar (+)
import "@draft-js-plugins/side-toolbar/lib/plugin.css";
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
  createInlineStyleButton,
} from "@draft-js-plugins/buttons";

import {
  ButtonCode,
  ButtonImage,
  ButtonBlockQuote,
  ButtonVideo,
  ButtonOrderedList,
  ButtonUnOrderedList,
} from "./buttons/Buttons";

import { imageClicked } from "./image";
import { videoPlugin } from "./video";

export const sideToolbarPlugin = createSideToolbarPlugin({});

const { SideToolbar } = sideToolbarPlugin;

interface Props {
  getImageUrl: () => Promise<string>;
}

const Sidebar = ({ getImageUrl }: Props) => {
  return (
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
        </div>
      )}
    </SideToolbar>
  );
};
export default Sidebar;
