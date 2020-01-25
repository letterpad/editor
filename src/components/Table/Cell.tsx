//@ts-nocheck
import * as React from "react";

import Grip from "./Grip";
import { SlateNodeProps } from "../../types";
// import type { SlateNodeProps as Props } from "../../types";
import Toolbar from "./Toolbar";
import styled from "styled-components";

const Cell: React.FC<SlateNodeProps> = props => {
  const cell = React.useRef<HTMLTableDataCellElement>();

  const { children, editor, readOnly, attributes, node } = props;
  const { document } = editor.value;

  const position = editor.getPositionByKey(document, node.key);
  const isFirstRow = position.isFirstRow();
  const isFirstColumn = position.isFirstColumn();
  const isLastRow = position.isLastRow();
  const isLastColumn = position.isLastColumn();
  const isSelected = node.data.get("selected");
  const isTableSelected = position.table.data.get("selectedTable");
  const isActive = editor.isSelectionInTable() && !isTableSelected;
  const selectedRows = position.table.data.get("selectedRows");
  const selectedColumns = position.table.data.get("selectedColumns");
  const isRowSelected =
    selectedRows && selectedRows.includes(position.getRowIndex());
  const isColumnSelected =
    selectedColumns && selectedColumns.includes(position.getColumnIndex());

  return (
    <StyledTd
      isFirstRow={isFirstRow}
      isFirstColumn={isFirstColumn}
      isSelected={isSelected}
      onClick={() => editor.clearSelected(position.table)}
      {...attributes}
    >
      <div ref={cell}></div>
      {!readOnly && (
        <React.Fragment>
          {isFirstColumn && isFirstRow && (
            <React.Fragment>
              <GripTable
                contentEditable={false}
                isSelected={isTableSelected}
                onClick={ev => {
                  ev.preventDefault();
                  ev.stopPropagation();

                  if (isTableSelected) {
                    editor.clearSelected(position.table);
                  } else {
                    editor.selectAll().blur();
                  }
                }}
              />
              <Toolbar
                editor={editor}
                cell={cell.current}
                active={isTableSelected}
                type="table"
              />
            </React.Fragment>
          )}
          {isFirstColumn && (
            <React.Fragment>
              <GripRow
                isFirstRow={isFirstRow}
                isLastRow={isLastRow}
                isSelected={isRowSelected}
                contentEditable={false}
                onClick={ev => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  editor.selectRow(!isSelected || isTableSelected).blur();
                }}
              />
              {isActive && (
                <Toolbar
                  editor={editor}
                  cell={cell.current}
                  active={isRowSelected}
                  type="row"
                />
              )}
            </React.Fragment>
          )}
          {isFirstRow && (
            <React.Fragment>
              <GripColumn
                isFirstColumn={isFirstColumn}
                isLastColumn={isLastColumn}
                isSelected={isColumnSelected}
                contentEditable={false}
                onClick={ev => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  editor.selectColumn(!isSelected || isTableSelected).blur();
                }}
              />
              {isActive && (
                <Toolbar
                  editor={editor}
                  cell={cell.current}
                  active={isColumnSelected}
                  type="column"
                />
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}

      <RowContent align={node.data.get("align")}>{children}</RowContent>
    </StyledTd>
  );
};

export const GripTable = styled(Grip)`
  width: 13px;
  height: 13px;
  border-radius: 13px;
  border: 2px solid var(--color-border);

  position: absolute;
  top: -18px;
  left: -18px;
`;

export const GripRow = styled(Grip)`
  left: -16px;
  top: 0px;
  height: 100%;
  width: 12px;
  border-right: 3px solid var(--color-border);

  ${props =>
    props.isFirstRow &&
    `
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  `}

  ${props =>
    props.isLastRow &&
    `
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  `}
`;

export const GripColumn = styled(Grip)`
  top: -16px;
  left: 0px;
  width: 100%;
  height: 12px;
  border-bottom: 3px solid var(--color-border);

  ${props =>
    props.isFirstColumn &&
    `
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`}

  ${props =>
    props.isLastColumn &&
    `
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`}
`;

const RowContent = styled.div`
  padding: 4px 12px;
  text-align: ${props => props.align};
`;

const StyledTd = styled.td<any>`
  vertical-align: top;
  border-right: 1px solid var(--color-border);
  position: relative;
  background: ${props => (props.isSelected ? "var(--bg-hover-success)" : "")};
  color: ${props => (props.isSelected ? "var(--bg-base)" : "inherit")};
  ${props =>
    props.isFirstRow &&
    `
  min-width: 100px;
  `}
`;

export default Cell;
