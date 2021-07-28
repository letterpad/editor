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

import { imageClicked } from "./image";

export const sideToolbarPlugin = createSideToolbarPlugin({});

const { SideToolbar } = sideToolbarPlugin;

const ImageButton = createInlineStyleButton({
  style: "",
  children: (
    <svg
      id="prefix__Layer_1"
      viewBox="0 0 64 64"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{".prefix__st0{fill:#999}"}</style>
      <g id="prefix__Icon-Image" transform="translate(278 232)">
        <path
          className="prefix__st0"
          d="M-226.2-181.6h-39.5c-2.3 0-4.2-1.9-4.2-4.2V-214c0-2.3 1.9-4.2 4.2-4.2h39.5c2.3 0 4.2 1.9 4.2 4.2v28.2c0 2.3-1.9 4.2-4.2 4.2zm-39.6-33.9c-.8 0-1.4.6-1.4 1.4v28.2c0 .8.6 1.4 1.4 1.4h39.5c.8 0 1.4-.6 1.4-1.4v-28.2c0-.8-.6-1.4-1.4-1.4h-39.5z"
          id="prefix__Fill-12"
        />
        <path
          className="prefix__st0"
          d="M-238.9-201.5c-3.1 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm0-8.5c-1.6 0-2.9 1.3-2.9 2.9 0 1.6 1.3 2.9 2.9 2.9 1.6 0 2.9-1.3 2.9-2.9 0-1.6-1.3-2.9-2.9-2.9z"
          id="prefix__Fill-13"
        />
        <path
          className="prefix__st0"
          id="prefix__Fill-14"
          d="M-231.4-182.1l-23.1-21.7-13.2 12.2-1.8-1.9 15-13.9 24.9 23.4-1.8 1.9"
        />
        <path
          className="prefix__st0"
          id="prefix__Fill-15"
          d="M-224.2-189.3l-7.7-6.2-6.4 5.3-1.7-2.1 8.1-6.6 9.3 7.6-1.6 2"
        />
      </g>
    </svg>
  ),
});

interface Props {
  getImageUrl: () => Promise<string>;
}

const Sidebar = ({ getImageUrl }: Props) => {
  return (
    <SideToolbar>
      {externalProps => (
        <div>
          <HeadlineOneButton {...externalProps} />
          <HeadlineTwoButton {...externalProps} />
          <UnorderedListButton {...externalProps} />
          <OrderedListButton {...externalProps} />
          <BlockquoteButton {...externalProps} />
          <CodeBlockButton {...externalProps} />
          <div onClick={() => imageClicked(externalProps, { getImageUrl })}>
            <ImageButton {...externalProps} />
          </div>
        </div>
      )}
    </SideToolbar>
  );
};
export default Sidebar;
