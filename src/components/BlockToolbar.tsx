import { Block, Editor, Node } from "slate";
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
import EditList from "../plugins/EditList";
import { ICustomToolbar } from "../types";
import React from "react";
import ToolbarButton from "./ToolbarButton";
import { findDOMNode } from "react-dom";
import styled from "styled-components";

const { changes } = EditList;

interface ToolbarProps {
  editor: Editor;
  node: Node;
  attributes: object;
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

  file = React.createRef<HTMLInputElement>();
  insertingImage = false;
  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("click", this.handleOutsideMouseClick);
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("click", this.handleOutsideMouseClick);
    }
    this.insertingImage = false;
  }

  handleOutsideMouseClick = (ev: any) => {
    const element = findDOMNode(this.bar.current);

    if (
      this.insertingImage ||
      !element ||
      (ev.target instanceof Node && element.contains(ev.target)) ||
      (ev.button && ev.button !== 0)
    ) {
      return;
    }
    this.removeSelf(ev);
  };

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

  onPickImage = ev => {
    this.insertingImage = true;
    if (this.props.editor.props.onImageBrowse) {
      this.removeSelf(ev);
      return this.props.editor.props.onImageBrowse();
    }
    // simulate a click on the file upload input element
    if (this.file.current) this.file.current.click();

    document.body.onfocus = () => {
      setTimeout(() => {
        this.insertingImage = false;
        this.removeSelf(ev);
      }, 100);
      document.body.onfocus = null;
    };
    // setTimeout(() => {
    //   this.removeSelf(ev);
    // }, 200);
  };

  onImagePicked = async (ev: any) => {
    const files = getDataTransferFiles(ev);
    const { editor } = this.props;
    this.removeSelf(ev);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      editor.insertImageFile(file);
    }
  };

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
    const checked = type === "check-list" ? false : undefined;

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
      case "check-list":
        return this.insertList("check-list");
      case "image":
        return this.onPickImage(ev);
      default:
    }
  };

  onClose(): void {
    this.setState({ insertingImage: false });
  }

  render(): React.ReactNode {
    const { insertingImage } = this.state;
    const { editor } = this.props;
    return (
      <Container ref={this.bar} className="block-toolbar">
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
          active={this.checkActiveBlock("check-list")}
          onMouseDown={e => this.handleClickBlock(e, "check-list")}
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
          onMouseDown={e => {
            // e.preventDefault();
            this.onPickImage(e);
          }}
          active={insertingImage}
        >
          <ImageIcon />
        </ToolbarButton>
        {editor.props.addToToolbar.map((item: ICustomToolbar, idx: number) => {
          return (
            <ToolbarButton
              onMouseDown={e => {
                e.preventDefault();
                item.onClick(item.name, editor);
              }}
              key={idx}
            >
              {item.icon}
            </ToolbarButton>
          );
        })}
        <HiddenInput
          type="file"
          ref={this.file}
          onChange={this.onImagePicked}
          accept="image/*"
        />
      </Container>
    );
  }
}

function getDataTransferFiles(event: any) {
  let dataTransferItemsList = [];

  if (event.dataTransfer) {
    const dt = event.dataTransfer;
    if (dt.files && dt.files.length) {
      dataTransferItemsList = dt.files;
    } else if (dt.items && dt.items.length) {
      // During the drag even the dataTransfer.files is null
      // but Chrome implements some drag store, which is accesible via dataTransfer.items
      dataTransferItemsList = dt.items;
    }
  } else if (event.target && event.target.files) {
    dataTransferItemsList = event.target.files;
  }
  // Convert from DataTransferItemsList to the native Array
  return Array.prototype.slice.call(dataTransferItemsList);
}

const HiddenInput = styled.input`
  position: absolute;
  top: -100px;
  left: -100px;
  visibility: hidden;
`;
