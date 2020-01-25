import { Block, Editor, Node } from "slate";
// import ToolbarButton from "./_Toolbar/ToolbarButton";
import {
  BulletListIcon,
  CodeblockIcon,
  Heading1Icon,
  Heading2Icon,
  ImageIcon,
  OrderedListIcon,
  TableIcon,
  TodoListIcon
} from "../icons";

import { Container } from "./BlockToolbar.css";
// import ImageUpload from "./ImageUpload";
// import cx from "classnames";
import EditList from "../plugins/EditList";
import React from "react";
import ToolbarButton from "./ToolbarButton";
import { findDOMNode } from "react-dom";

const { changes } = EditList;

interface ToolbarProps {
  editor: Editor;
  node: Node;
}

interface ToolbarState {
  insertingImage: boolean;
}

type Options = {
  type: string | Object;
  wrapper?: string | Object;
};

export default class BlockToolbar extends React.Component<
  ToolbarProps,
  ToolbarState
> {
  state = {
    insertingImage: false
  };
  bar = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("click", this.handleOutsideMouseClick);
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("click", this.handleOutsideMouseClick);
    }
  }

  handleOutsideMouseClick = (ev: any) => {
    const element = findDOMNode(this.bar.current);

    if (
      !element ||
      (ev.target instanceof Node && element.contains(ev.target)) ||
      (ev.button && ev.button !== 0)
    ) {
      return;
    }
    this.removeSelf(ev);
  };

  // @keydown("esc")
  removeSelf(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    this.props.editor.setNodeByKey(this.props.node.key, {
      type: "paragraph",
      text: "",
      isVoid: false
    });
  }

  checkActiveBlock(type: string): boolean {
    const { editor } = this.props;
    const { document } = editor.value;

    if (type == "ol_list" || type == "ul_list") {
      if (!editor.value.startBlock) {
        return false;
      }
      const parentList = document.getClosest(
        editor.value.startBlock.key,
        a => a.object == "block" && (a.type == "ol_list" || a.type == "ul_list")
      ) as Block;

      return parentList && parentList.type === type;
    }

    return editor.value.blocks.some(
      block => block != undefined && block.type === type
    );
  }

  checkActiveInline(type: string): boolean {
    const { editor } = this.props;
    return editor.value.inlines.some(
      inline => inline != undefined && inline.type === type
    );
  }

  toggleMark(e: React.PointerEvent, type: string): void {
    e.preventDefault();
    const { editor } = this.props;

    editor.toggleMark(type);
  }

  insertBlock = (
    options: Options,
    cursorPosition: "before" | "on" | "after" = "on"
  ) => {
    const { editor } = this.props;

    editor.moveToEndOfNode(this.props.node);

    if (options.type === "table") {
      editor.insertTable(3, 3).moveSelection(0, 0);
    } else {
      editor.insertBlock(options.type as string);
    }

    editor.removeNodeByKey(this.props.node.key).moveToEnd();

    if (cursorPosition === "before") editor.moveToStartOfPreviousBlock();
    if (cursorPosition === "after") editor.moveToStartOfNextBlock();
    return editor.focus();
  };

  insertList = (type: string) => {
    const { editor } = this.props;
    const checked = type === "todo-list" ? false : undefined;

    this.props.editor.setNodeByKey(this.props.node.key, {
      type: "paragraph",
      text: "",
      isVoid: false
    });

    return editor
      .moveToEndOfNode(this.props.node)
      .command(changes.wrapInList, type, undefined, {
        type: "list-item",
        data: { checked }
      })
      .focus();
  };

  handleClickBlock = (ev: React.MouseEvent, type: string) => {
    ev.preventDefault();
    ev.stopPropagation();

    switch (type) {
      case "heading1":
      case "heading2":
      case "block-quote":
      case "table":
      case "code":
        return this.insertBlock({ type });
      case "horizontal-rule":
        return this.insertBlock(
          {
            type: { type: "horizontal-rule", isVoid: true }
          },
          "after"
        );
      case "bulleted-list":
        return this.insertList("bulleted-list");
      case "ordered-list":
        return this.insertList("ordered-list");
      case "todo-list":
        return this.insertList("todo-list");
      case "image":
      //return this.onPickImage();
      default:
    }
  };

  openImageUploader(e: React.MouseEvent): void {
    e.preventDefault();
    this.setState({ insertingImage: true });
  }

  insertImage(image: Blob): void {
    const { editor } = this.props;

    this.setState({ insertingImage: false });
    editor.command("insertImage", image);
  }

  onClose(): void {
    this.setState({ insertingImage: false });
  }

  onSubmit(image: Blob): void {
    const { editor } = this.props;
    editor.command("insertImage", image);
  }

  render(): React.ReactNode {
    const { insertingImage } = this.state;

    return (
      <Container ref={this.bar}>
        <ToolbarButton
          active={this.checkActiveBlock("heading1")}
          onMouseDown={e => this.handleClickBlock(e, "heading1")}
        >
          <Heading1Icon />
        </ToolbarButton>
        <ToolbarButton
          active={this.checkActiveBlock("heading2")}
          onMouseDown={e => this.handleClickBlock(e, "heading2")}
        >
          <Heading2Icon />
        </ToolbarButton>
        <ToolbarButton
          active={this.checkActiveBlock("code")}
          onMouseDown={e => this.handleClickBlock(e, "code")}
        >
          <CodeblockIcon />
        </ToolbarButton>
        <ToolbarButton
          active={this.checkActiveBlock("bulleted-list")}
          onMouseDown={e => this.handleClickBlock(e, "bulleted-list")}
        >
          <BulletListIcon />
        </ToolbarButton>
        <ToolbarButton
          active={this.checkActiveBlock("ordered-list")}
          onMouseDown={e => this.handleClickBlock(e, "ordered-list")}
        >
          <OrderedListIcon />
        </ToolbarButton>
        <ToolbarButton
          active={this.checkActiveBlock("todo-list")}
          onMouseDown={e => this.handleClickBlock(e, "todo-list")}
        >
          <TodoListIcon />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={e => this.handleClickBlock(e, "table")}
          active={this.checkActiveBlock("table")}
        >
          <TableIcon />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={e => this.openImageUploader(e)}
          active={insertingImage}
        >
          <ImageIcon />
        </ToolbarButton>
        {/* {insertingImage && (
          <ImageUpload
            uploadFunction={img => this.insertImage(img)}
            cancel={() => this.setState({ insertingImage: false })}
          />
        )} */}
      </Container>
    );
  }
}
