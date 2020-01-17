import * as React from "react";

import {
  BlockQuoteIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  HighlightIcon,
  ItalicIcon,
  LinkIcon,
  Separator,
  StrikeThroughIcon
} from "../icons";

import { Editor } from "slate-react";
import ToolbarButton from "./ToolbarButton";

// import {
//   BoldIcon,
//   CodeIcon,
//   Heading1Icon,
//   Heading2Icon,
//   ItalicIcon,
//   BlockQuoteIcon,
//   LinkIcon,
//   StrikethroughIcon,
// } from "outline-icons";

// import type { Theme, Mark, Block } from "../../types";
// import ToolbarButton from "./ToolbarButton";
// import { Mark } from "slate";
// import Separator from "./Separator";

type Props = {
  editor: Editor;
  onCreateLink: (ev: React.SyntheticEvent) => void;
};

class FormattingToolbar extends React.Component<Props> {
  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */
  hasMark = (type: string) => {
    try {
      //@ts-ignore
      return this.props.editor.value.marks.some(mark => mark.type === type);
    } catch (_err) {
      return false;
    }
  };

  isBlock = (type: string) => {
    const { startBlock, document } = this.props.editor.value;

    // accounts for blocks with an inner paragraph tag
    const parent = startBlock && document.getParent(startBlock.key);

    return (
      (startBlock && startBlock.type === type) ||
      //@ts-ignore
      (parent && parent.type === type)
    );
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} ev
   * @param {String} type
   */
  onClickMark = (ev: React.SyntheticEvent, type: string) => {
    ev.preventDefault();
    ev.stopPropagation();

    const { editor } = this.props;
    editor.toggleMark(type);

    // ensure we remove any other marks on inline code
    // we don't allow bold / italic / strikethrough code.
    const isInlineCode = this.hasMark("code") || type === "code";
    if (isInlineCode) {
      editor.value.marks.forEach(mark => {
        //@ts-ignore
        if (mark.type !== "code") editor.removeMark(mark);
      });
    }
  };

  onClickBlock = (ev: React.SyntheticEvent, type: string) => {
    ev.preventDefault();
    ev.stopPropagation();
    const { editor } = this.props;
    const { startBlock, document } = editor.value;
    const parent = document.getParent(startBlock.key);

    editor.setNodeByKey(startBlock.key, type);

    // accounts for blocks with an inner paragraph tag
    //@ts-ignore
    if (parent && parent.type && type === "paragraph") {
      editor.setNodeByKey(parent.key, type);
    }
  };

  handleCreateLink = (ev: React.MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();

    let selection: Selection | null | string = window.getSelection();
    if (selection) {
      selection = selection.toString().trim();

      if (selection.length) {
        const data = { href: "" };
        this.props.editor.wrapInline({ type: "link", data });
        this.props.onCreateLink(ev);
      }
    }
  };

  renderMarkButton = (type: string, IconClass: React.ComponentType<any>) => {
    // const { hiddenToolbarButtons } = this.props.theme;
    //@ts-ignore
    const Tooltip = this.props.editor.props.tooltip;

    // if (
    //   hiddenToolbarButtons &&
    //   hiddenToolbarButtons.marks &&
    //   hiddenToolbarButtons.marks.includes(type)
    // ) {
    //   return null;
    // }

    const isActive = this.hasMark(type);
    const onMouseDown = ev => this.onClickMark(ev, type);

    return (
      <ToolbarButton onMouseDown={onMouseDown} active={isActive}>
        <IconClass />
      </ToolbarButton>
    );
  };

  renderBlockButton = (type: string, IconClass: React.ComponentType) => {
    // const { hiddenToolbarButtons } = this.props.theme;
    // @ts-ignore
    const Tooltip = this.props.editor.props.tooltip;

    // if (
    //   hiddenToolbarButtons &&
    //   hiddenToolbarButtons.blocks &&
    //   hiddenToolbarButtons.blocks.includes(type)
    // )
    //   return null;

    const isActive = this.isBlock(type);

    const onMouseDown = ev =>
      this.onClickBlock(ev, isActive ? "paragraph" : type);

    return (
      <ToolbarButton onMouseDown={onMouseDown} active={isActive || false}>
        <IconClass />
      </ToolbarButton>
    );
  };

  onMouseDown = (ev, type) => {
    const isActive = this.isBlock(type);
    this.onClickBlock(ev, isActive ? "paragraph" : type);
  };

  render() {
    const { editor } = this.props;
    //@ts-ignore
    const isSelectionInHeading = editor.isSelectionInHeading();
    //@ts-ignore
    const isSelectionInTable = editor.isSelectionInTable();

    return (
      <React.Fragment>
        {!isSelectionInHeading && (
          <React.Fragment>
            {this.renderMarkButton("bold", BoldIcon)}
            {this.renderMarkButton("italic", ItalicIcon)}
            {this.renderMarkButton("deleted", StrikeThroughIcon)}
            {this.renderMarkButton("code", HighlightIcon)}
          </React.Fragment>
        )}
        {!isSelectionInTable && (
          <React.Fragment>
            {!isSelectionInHeading && <Separator />}
            {!isSelectionInHeading &&
              this.renderBlockButton("block-quote", BlockQuoteIcon)}

            <ToolbarButton
              active={this.isBlock("heading1") || false}
              onMouseDown={e => this.onMouseDown(e, "heading1")}
            >
              <Heading1Icon />
            </ToolbarButton>
            <ToolbarButton
              active={this.isBlock("heading2") || false}
              onMouseDown={e => this.onMouseDown(e, "heading2")}
            >
              <Heading2Icon />
            </ToolbarButton>
          </React.Fragment>
        )}
        &nbsp;
        {!isSelectionInHeading && (
          <React.Fragment>
            <Separator />
            <ToolbarButton onMouseDown={this.handleCreateLink}>
              <LinkIcon />
            </ToolbarButton>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default FormattingToolbar;
