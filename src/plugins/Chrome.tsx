import * as React from "react";

import BlockInsert from "../components/BlockInsert";
import { Editor } from "slate-react";
import { EditorProps } from "../editor";
import HoveringMenu from "../components/HoveringMenu";

function ChromePlugin() {
  function renderEditor(
    props: EditorProps,
    editor: Editor,
    next: () => React.ReactChild
  ) {
    const children = next();

    return (
      <React.Fragment>
        {!props.readOnly && (
          <HoveringMenu value={editor.value} editor={editor} />
        )}
        {!props.readOnly && <BlockInsert editor={editor} />}
        {children}
      </React.Fragment>
    );
  }

  return { renderEditor };
}

export default ChromePlugin;
