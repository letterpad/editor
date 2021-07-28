import Draft from "draft-js";
import Prism from "prismjs";
const { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } = Draft;

const { Map, List } = Immutable;

export class PrismDraftDecorator {
  grammar;
  highlighted;

  constructor(grammar) {
    this.grammar = grammar;
    this.highlighted = {};
  }

  getDecorations(block) {
    var blockType = block.getType();
    var blockKey = block.getKey();
    var blockText = block.getText();
    var decorations = Array(blockText.length).fill(null);

    this.highlighted[blockKey] = {};

    if (blockType !== "code-block") {
      return List(decorations);
    }

    var tokens = Prism.tokenize(blockText, this.grammar);

    var offset = 0;
    var that = this;

    tokens.forEach(function (tok) {
      if (typeof tok === "string") {
        offset += tok.length;
      } else {
        var tokId = "tok" + offset;
        var completeId = blockKey + "-" + tokId;

        that.highlighted[blockKey][tokId] = tok;

        occupySlice(
          decorations,
          offset,
          offset + tok.content.length,
          completeId,
        );

        offset += tok.content.length;
      }
    });

    return List(decorations);
  }

  getComponentForKey(key) {
    return function (props) {
      return (
        <span {...props} className={"token " + props.tokType}>
          {props.children}
        </span>
      );
    };
  }

  getPropsForKey(key) {
    var parts = key.split("-");
    var blockKey = parts[0];
    var tokId = parts[1];
    var token = this.highlighted[blockKey][tokId];

    return {
      tokType: token.type,
    };
  }
}

function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}
