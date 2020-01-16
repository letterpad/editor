import React, { SFC, MouseEventHandler } from "react";
import { Editor, Block, Node } from "slate";
// import ImageUpload from "./ImageUpload";
// import cx from "classnames";
import EditList from "../plugins/EditList";
import { findDOMNode } from "react-dom";
import classnames from "classnames";
import styled from "styled-components";

const { changes } = EditList;

//-----------------

const Wrapper = styled.span<any>`
  &.active {
    color: var(--bg-success);
  }
  ${(p: any) => p.styleString}
  .material-icons {
    /* border: 1px solid;
    border-radius: 50%; */
    padding: 3px;
    margin-right: 6px;
    font-size: 18px;
  }
  z-index: 999;
  cursor: pointer;
`;
const TextIcon = styled.span`
  /* border-radius: 50%;
  border: 1px solid; */
  font-size: 12px;
  font-weight: 600;
  width: 32px;
  height: 32px;
  vertical-align: text-bottom;
  margin-right: 6px;
  display: inline-block;
  padding: 3px;
  font-family: sans-serif;
  line-height: 25px;
  text-align: center;
`;

interface ButtonProps {
  onMouseDown: MouseEventHandler;
  icon?: string;
  active?: boolean;
  styleString?: string;
  iconText?: string;
}

export const Button: SFC<ButtonProps> = ({
  onMouseDown,
  active,
  icon,
  iconText,
  styleString
}) => {
  const classes = classnames("button", {
    active
  });
  const isImageLink = icon && icon.indexOf(".") > 0;
  const isMaterial = !isImageLink && !iconText;
  return (
    <Wrapper
      styleString={styleString}
      className={classes}
      onMouseDown={onMouseDown}
      icon={icon}
    >
      {isImageLink && <span className="custom-icons" />}
      {iconText && <TextIcon className="lp-text-icon">{iconText}</TextIcon>}
      {isMaterial && <span className="material-icons">{icon}</span>}
    </Wrapper>
  );
};

//------------------

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

  handleOutsideMouseClick = (ev: MouseEvent) => {
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
      type: "paragraph"
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
      // editor.insertTable(3, 3).moveSelection(0, 0);
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
      type: "paragraph"
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
      <div ref={this.bar}>
        <Button
          active={this.checkActiveBlock("heading1")}
          onMouseDown={e => this.handleClickBlock(e, "heading1")}
          iconText="H1"
        />
        <Button
          active={this.checkActiveBlock("heading2")}
          onMouseDown={e => this.handleClickBlock(e, "heading2")}
          iconText="H2"
        />
        <Button
          active={this.checkActiveBlock("code_block")}
          onMouseDown={e => this.handleClickBlock(e, "code_block")}
          icon="code"
        >
          cb
        </Button>
        <Button
          active={this.checkActiveBlock("bulleted-list")}
          onMouseDown={e => this.handleClickBlock(e, "bulleted-list")}
          icon="format_list_bulleted"
        >
          li
        </Button>
        <Button
          active={this.checkActiveBlock("ordered-list")}
          onMouseDown={e => this.handleClickBlock(e, "ordered-list")}
          icon="format_list_numbered"
        >
          ol
        </Button>
        <Button
          active={this.checkActiveBlock("todo-list")}
          onMouseDown={e => this.handleClickBlock(e, "todo-list")}
          icon="check_box"
        >
          tl
        </Button>

        <Button
          onMouseDown={e => this.openImageUploader(e)}
          active={insertingImage}
          icon="image"
        ></Button>
        {/* {insertingImage && (
          <ImageUpload
            uploadFunction={img => this.insertImage(img)}
            cancel={() => this.setState({ insertingImage: false })}
          />
        )} */}
      </div>
    );
  }
}
