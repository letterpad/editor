import HighlightButton from "./HighlightButton";
import HighlightMark from "./HighlightMark";
import { HighlightPlugin } from ".";
import { PluginConfig } from "..";

const highlightConfig: PluginConfig[] = [
  {
    type: "mark",
    tag: "mark",
    menuButtons: [
      {
        button: HighlightButton,
        props: { type: "heading-one" }
      }
    ],
    render: HighlightMark,
    identifier: ["code"],
    main: HighlightPlugin,
    markdown: {
      trigger: "space",
      before: /\s?(`|``)((?!\1).)+?\1$/,
      change: (editor, _, matched) => {
        const text = matched.before[0].replace(/\`/g, "");

        return editor
          .insertText(text)
          .moveFocusBackward(text.length)
          .addMark("code")
          .moveFocusForward(text.length)
          .removeMark("code")
          .insertText(" ");
      }
    }
  }
];

export default highlightConfig;
