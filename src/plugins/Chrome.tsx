import * as React from "react";
import { Editor } from "slate";
// import Contents from "../components/Contents";
import HoveringMenu from "../components/HoveringMenu";
import BlockInsert from "../components/BlockInsert";
import { EditorProps } from "../editor";
import { StyledMenu } from "../editor.css";
// import type { Props } from "../";

function ChromePlugin() {
  function renderEditor(
    _props: EditorProps,
    editor: Editor,
    next: () => React.ReactChild
  ) {
    const children = next();

    return (
      <React.Fragment>
        {
          <StyledMenu>
            <HoveringMenu value={editor.value} editor={editor} />
          </StyledMenu>
        }
        {<BlockInsert editor={editor} />}
        {/* {props.toc && <Contents editor={editor} />} */}
        {children}
      </React.Fragment>
    );
  }

  return { renderEditor };
}

export default ChromePlugin;
