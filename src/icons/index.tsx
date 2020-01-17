import { Icon, IconText } from "../components/ToolbarButton";

import React from "react";
import styled from "styled-components";

export const BoldIcon = () => {
  return <Icon icon="format_bold" />;
};

export const ItalicIcon = () => {
  return <Icon icon="format_italic" />;
};

export const StrikeThroughIcon = () => {
  return <Icon icon="format_strikethrough" />;
};

export const TrashIcon = () => {
  return <Icon icon="delete" />;
};

export const LeftAlignIcon = () => {
  return <Icon icon="format_align_left" />;
};

export const JustifyIcon = () => {
  return <Icon icon="format_align_justify" />;
};

export const RightAlignIcon = () => {
  return <Icon icon="format_align_right" />;
};

export const OrderedListIcon = () => {
  return <Icon icon="format_list_numbered" />;
};

export const BulletListIcon = () => {
  return <Icon icon="format_list_bulleted" />;
};

export const TodoListIcon = () => {
  return <Icon icon="todo-list" />;
};

export const CodeblockIcon = () => {
  return <Icon icon="code" />;
};

export const ImageIcon = () => {
  return <Icon icon="image" />;
};

export const HighlightIcon = () => {
  return <Icon icon="highlight" />;
};

export const BlockQuoteIcon: React.FC = () => {
  return <Icon icon="format_quote" />;
};

export const LinkIcon: React.FC = () => {
  return <Icon icon="link" />;
};

export const Heading1Icon = () => {
  return <IconText text="H1" />;
};

export const Heading2Icon = () => {
  return <IconText text="H2" />;
};

export const Heading3Icon = () => {
  return <IconText text="H3" />;
};

export const Heading4Icon = () => {
  return <IconText text="H4" />;
};

export const Heading5Icon = () => {
  return <IconText text="H5" />;
};

export const Heading6Icon = () => {
  return <IconText text="H6" />;
};

export const InsertRowBottomIcon = () => {
  return <Icon icon="vertical_align_bottom" />;
};

export const InsertRowTopIcon = () => {
  return <Icon icon="vertical_align_top" />;
};

export const InsertColumnRightIcon = () => {
  return <Icon icon="chevron_right" />;
};

export const InsertColumnLeftIcon = () => {
  return <Icon icon="chevron_left" />;
};

export const Separator = styled.div`
  height: calc(70%);
  width: 1px;
  background: var(--base-shade-8);
  opacity: 0.3;
  display: inline-block;
  margin: 0 3px;
`;
