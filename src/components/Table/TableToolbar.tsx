//@ts-nocheck
import * as React from "react";

import {
  InsertColumnLeftIcon,
  InsertColumnRightIcon,
  InsertRowBottomIcon,
  InsertRowTopIcon,
  JustifyIcon,
  LeftAlignIcon,
  RightAlignIcon,
  Separator,
  TrashIcon
} from "../../icons";

import { Editor } from "slate-react";
import ToolbarButton from "../ToolbarButton";

type Props = {
  isRowSelected: boolean;
  isColumnSelected: boolean;
  isTableSelected: boolean;
  editor: Editor;
  // theme: Theme,
};

class TableToolbar extends React.Component<Props> {
  hasAlign = (align: string) => {
    try {
      const { editor } = this.props;
      const { startBlock, document } = editor.value;
      const position = editor.getPositionByKey(document, startBlock.key);

      return (
        position.cell.data.get("align") === align ||
        startBlock.data.get("align") === align
      );
    } catch (_err) {
      return false;
    }
  };

  onClickAlign = (ev, align) => {
    ev.preventDefault();
    ev.stopPropagation();

    const { editor } = this.props;
    const { startBlock, document } = editor.value;
    const position = editor.getPositionByKey(document, startBlock.key);
    editor.moveSelection(position.getColumnIndex(), position.getRowIndex());
    editor.setColumnAlign(align);
  };

  renderAlignButton = (align: string, IconClass: React.ComponentType<any>) => {
    const isActive = this.hasAlign(align);
    const onMouseDown = ev => this.onClickAlign(ev, align);

    return (
      <ToolbarButton onMouseDown={onMouseDown} active={isActive}>
        <IconClass />
      </ToolbarButton>
    );
  };

  removeTable = ev => {
    ev.preventDefault();
    this.props.editor.removeTable().blur();
  };

  addRowBelow = ev => {
    ev.preventDefault();

    const { editor } = this.props;
    const { startBlock, document } = editor.value;
    const position = editor.getPositionByKey(document, startBlock.key);
    editor
      .clearSelected(position.table)
      .insertRow(position.getRowIndex() + 1)
      .resetAlign(position.table, position.getRowIndex() + 1)
      .blur();
  };

  addRowAbove = ev => {
    ev.preventDefault();

    const { editor } = this.props;
    const { startBlock, document } = editor.value;
    const position = editor.getPositionByKey(document, startBlock.key);
    editor
      .clearSelected(position.table)
      .insertRow(position.getRowIndex())
      .resetAlign(position.table, position.getRowIndex())
      .blur();
  };

  removeRow = ev => {
    ev.preventDefault();
    this.props.editor.removeRow().blur();
  };

  addColumnRight = ev => {
    ev.preventDefault();
    const { editor } = this.props;
    const { startBlock, document } = editor.value;
    const position = editor.getPositionByKey(document, startBlock.key);

    this.props.editor.clearSelected(position.table).insertColumn();
  };

  addColumnLeft = ev => {
    ev.preventDefault();
    const { editor } = this.props;
    const { startBlock, document } = editor.value;
    const position = editor.getPositionByKey(document, startBlock.key);

    editor
      .insertColumn(position.getColumnIndex())
      .clearSelected(position.table)
      .moveSelectionBy(-1, 0);
  };

  removeColumn = ev => {
    ev.preventDefault();
    this.props.editor.removeColumn().blur();
  };

  render() {
    const { isRowSelected, isColumnSelected, isTableSelected } = this.props;

    return (
      <React.Fragment>
        {isTableSelected && (
          <ToolbarButton onMouseDown={this.removeTable}>
            <TrashIcon />
          </ToolbarButton>
        )}
        {isColumnSelected && (
          <React.Fragment>
            {this.renderAlignButton("left", LeftAlignIcon)}
            {this.renderAlignButton("center", JustifyIcon)}
            {this.renderAlignButton("right", RightAlignIcon)}
            <Separator />
            <ToolbarButton onMouseDown={this.removeColumn} icon="delete">
              <TrashIcon />
            </ToolbarButton>
            <Separator />
            <ToolbarButton onMouseDown={this.addColumnLeft} icon="">
              <InsertColumnLeftIcon />
            </ToolbarButton>
            <ToolbarButton onMouseDown={this.addColumnRight}>
              <InsertColumnRightIcon />
            </ToolbarButton>
          </React.Fragment>
        )}
        {isRowSelected && (
          <React.Fragment>
            <ToolbarButton onMouseDown={this.removeRow}>
              <TrashIcon />
            </ToolbarButton>
            <Separator />
            <ToolbarButton onMouseDown={this.addRowAbove}>
              <InsertRowTopIcon />
            </ToolbarButton>
            <ToolbarButton onMouseDown={this.addRowBelow}>
              <InsertRowBottomIcon />
            </ToolbarButton>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default TableToolbar;
