import * as React from "react";
import { withTheme } from "styled-components";
import { Editor } from "slate";
import { Button } from "./BlockToolbar";
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
  theme: any;
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
        // this.props.onCreateLink(ev);
      }
    }
  };

  renderMarkButton = (type: string, IconClass: string, tooltip: string) => {
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
      <Button onMouseDown={onMouseDown} active={isActive} icon={IconClass}>
        <Tooltip tooltip={tooltip} placement="top">
          {/* <IconClass color={this.props.theme.toolbarItem} /> */}
          {IconClass}
        </Tooltip>
      </Button>
    );
  };

  renderBlockButton = (type: string, IconClass: string, tooltip: string) => {
    const { hiddenToolbarButtons } = this.props.theme;
    // @ts-ignore
    const Tooltip = this.props.editor.props.tooltip;

    if (
      hiddenToolbarButtons &&
      hiddenToolbarButtons.blocks &&
      hiddenToolbarButtons.blocks.includes(type)
    )
      return null;

    const isActive = this.isBlock(type);

    const onMouseDown = ev =>
      this.onClickBlock(ev, isActive ? "paragraph" : type);

    return (
      <Button onMouseDown={onMouseDown} active={isActive || false}>
        <Tooltip tooltip={tooltip} placement="top">
          {IconClass}
          {/* <IconClass color={this.props.theme.toolbarItem} /> */}
        </Tooltip>
      </Button>
    );
  };

  render() {
    const { editor } = this.props;
    //@ts-ignore
    const isSelectionInHeading = editor.isSelectionInHeading();

    const isSelectionInTable = false; //editor.isSelectionInTable();
    //@ts-ignore
    const Tooltip = editor.props.tooltip;

    return (
      <React.Fragment>
        {!isSelectionInHeading && (
          <React.Fragment>
            {this.renderMarkButton("bold", "format_bold", "Bold")}
            {this.renderMarkButton("italic", "format_italic", "Italic")}
            {this.renderMarkButton(
              "deleted",
              "format_strikethrough",
              "Strikethrough"
            )}
            {this.renderMarkButton("code", "highlight", "Code")}
          </React.Fragment>
        )}
        {/* {!isSelectionInTable && (
          <React.Fragment>
            {!isSelectionInHeading && <Separator />}
            {this.renderBlockButton("heading1", Heading1Icon, "Heading")}
            {this.renderBlockButton("heading2", Heading2Icon, "Subheading")}
            {!isSelectionInHeading &&
              this.renderBlockButton("block-quote", BlockQuoteIcon, "Quote")}
          </React.Fragment>
        )*/}
        {!isSelectionInHeading && (
          <React.Fragment>
            {/* <Separator /> */}
            <Button onMouseDown={this.handleCreateLink} icon="insert_link">
              <Tooltip tooltip="Create link" placement="top">
                {/* <LinkIcon color={this.props.theme.toolbarItem} /> */}
              </Tooltip>
            </Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withTheme(FormattingToolbar);
