import * as React from "react";

import { CloseIcon, OpenIcon, TrashIcon } from "../icons";

import { Editor } from "slate-react";
import { Node } from "slate";
import ToolbarButton from "./ToolbarButton";
import { findDOMNode } from "react-dom";
import styled from "styled-components";

type Suggestion = {
  title: string;
  url: string;
};

type Props = {
  editor: Editor;
  link: Node;
  suggestions?: Suggestion[];
  onBlur: () => void;
};

type State = {
  isEditing: boolean;
  isFetching: boolean;
  results: string[];
};

class LinkToolbar extends React.Component<Props, State> {
  wrapper?: HTMLSpanElement;
  input?: HTMLInputElement;
  firstDocument?: any;
  originalValue: string = "";
  state = {
    isEditing: false,
    isFetching: false,
    results: []
  };

  componentDidMount() {
    this.originalValue = this.props.link.data.get("href");
    this.setState({ isEditing: !!this.originalValue });

    if (typeof window !== "undefined") {
      setImmediate(() =>
        window.addEventListener("mousedown", this.handleOutsideMouseClick)
      );
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousedown", this.handleOutsideMouseClick);
    }
  }

  handleOutsideMouseClick = (ev: MouseEvent) => {
    // check if we're clicking inside the link toolbar
    const element = findDOMNode(this.wrapper);
    if (
      !element ||
      (ev.target instanceof HTMLElement && element.contains(ev.target)) ||
      (ev.button && ev.button !== 0)
    ) {
      return;
    }

    // check if we're clicking inside the link text
    try {
      const linkElement = this.props.editor.findDOMNode(
        this.props.link.getPath(this.props.link.key)
      );

      if (
        !linkElement ||
        (ev.target instanceof HTMLElement && linkElement.contains(ev.target)) ||
        (ev.button && ev.button !== 0)
      ) {
        return;
      }
    } catch (err) {
      // errors finding dom node result in toolbar closing
    }

    // otherwise, we're clicking outside
    ev.preventDefault();
    this.save(this.input ? this.input.value : "");
  };

  search = async (term: string) => {
    const { editor } = this.props;
    if (!editor.props.onSearchLink) return;

    this.setState({ isFetching: true });

    if (term) {
      try {
        const results = await editor.props.onSearchLink(term);
        this.setState({ results });
      } catch (err) {
        console.error(err);
      }
    } else {
      this.setState({ results: [] });
    }

    this.setState({ isFetching: false });
  };

  selectSearchResult = (ev: React.SyntheticEvent, url: string) => {
    ev.preventDefault();
    this.save(url);
  };

  cancel = () => {
    this.save(this.originalValue);
  };

  onKeyDown = (ev: React.KeyboardEvent) => {
    switch (ev.key) {
      case "Enter":
        ev.preventDefault();
        if (!(ev.target instanceof HTMLInputElement)) return;
        return this.save(ev.target.value);
      case "Escape":
        ev.preventDefault();
        ev.stopPropagation();
        return this.cancel();
      case "ArrowDown":
        ev.preventDefault();
        if (this.firstDocument) {
          const element = findDOMNode(this.firstDocument);
          if (element instanceof HTMLElement) element.focus();
        }
        break;
      default:
    }
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.props.editor.props.onSearchLink) return;

    try {
      new URL(ev.target.value);
    } catch (err) {
      // this is not a valid url, show search suggestions
      this.search(ev.target.value);
      return;
    }
    this.setState({ results: [] });
  };

  onResultKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === "Escape") {
      ev.preventDefault();
      ev.stopPropagation();
      this.cancel();
    }
  };

  removeLink = () => {
    this.save("");
  };

  openLink = (ev: React.SyntheticEvent) => {
    const { link, editor } = this.props;
    const href = link.data.get("href");

    if (editor.props.onClickLink) {
      ev.preventDefault();
      editor.props.onClickLink(href);
    } else {
      window.open(href, "_blank");
    }
  };

  save = (href: string) => {
    const { editor, link } = this.props;
    href = href.trim();

    if (href) {
      // If the input doesn't start with mailto: or protocol or relative slash, make sure
      // a protocol is added
      if (
        !href.startsWith("mailto:") &&
        !href.startsWith("/") &&
        !href.match(/^https?:\/\//i)
      ) {
        href = `https://${href}`;
      }
      editor.setNodeByKey(link.key, { type: "link", data: { href } });
    } else if (link) {
      editor.unwrapInlineByKey(link.key);
    }
    editor.deselect();
    this.props.onBlur();
  };

  setFirstResultRef = (ref: any) => {
    this.firstDocument = ref;
  };

  setWrapperRef = (ref: HTMLSpanElement) => {
    this.wrapper = ref;
  };

  render() {
    const href = this.props.link.data.get("href");

    return (
      <span ref={this.setWrapperRef}>
        <LinkEditor>
          <Input
            ref={ref => (this.input = ref)}
            defaultValue={href}
            placeholder="Search or paste a link…"
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            autoFocus={href === ""}
          />
          {this.state.isEditing && (
            <ToolbarButton onMouseDown={this.openLink}>
              <OpenIcon />
            </ToolbarButton>
          )}
          <ToolbarButton onMouseDown={this.removeLink}>
            {this.state.isEditing ? <TrashIcon /> : <CloseIcon />}
          </ToolbarButton>
        </LinkEditor>
      </span>
    );
  }
}

const LinkEditor = styled.div`
  margin-left: -8px;
  margin-right: -8px;
  min-width: 300px;
  display: flex;
`;

const Input = styled.input`
  font-size: 15px;
  border-radius: 2px;
  padding: 4px 8px;
  border: 0;
  margin: 0;
  outline: none;
  flex-grow: 1;
`;

export default LinkToolbar;
