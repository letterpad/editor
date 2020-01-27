import * as React from "react";

import BlockInsert from "../components/BlockInsert";
import { Editor } from "slate-react";
import { EditorProps } from "../editor";
import HoveringMenu from "../components/HoveringMenu";

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
          // <StyledMenu>
          <HoveringMenu value={editor.value} editor={editor} />
          // </StyledMenu>
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
