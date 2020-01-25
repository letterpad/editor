import React, { PureComponent, SyntheticEvent, memo } from "react";
import { Schema, SchemaProperties, Value } from "slate";

import { GlobalStyle } from "./themes/Global.css";
import { ISearchResult } from "./types";
import Markdown from "./serializer";
import { Editor as SlateReactEditor } from "slate-react";
import commands from "./commands";
import createPlugins from "./plugins/plugins";
import queries from "./queries";
import schema from "./helper/schema";

const md = require("./initialText.md").default;
const defaultOptions = {};

export type Serializer = {
  deserialize: (str: string) => Value;
  serialize: (value: Value) => string;
};

type State = {
  editorValue: Value;
};
export type Plugin = {
  onClick?: (e: SyntheticEvent) => void;
  // onKeyDown?: (SyntheticKeyboardEvent<>, Editor, Function) => void,
};

export type EditorProps = {
  id?: string;
  defaultValue: string;
  placeholder: string;
  pretitle?: string;
  plugins: Plugin[];
  autoFocus?: boolean;
  readOnly?: boolean;
  headingsOffset?: number;
  toc?: boolean;
  dark?: boolean;
  schema?: SchemaProperties;
  serializer?: Serializer;
  theme?: Object;
  uploadImage?: (file: File) => Promise<string>;
  onSave?: ({ done }: { done?: boolean }) => void;
  onCancel?: () => void;
  onChange: (value: () => string) => void;
  onImageUploadStart?: () => void;
  onImageUploadStop?: () => void;
  onSearchLink?: (term: string) => Promise<ISearchResult[]>;
  onClickLink?: (href: string) => void;
  onClickHashtag?: (tag: string) => void;
  onShowToast?: (message: string) => void;
  getLinkComponent?: (node: Node) => React.ComponentType<any>;
  className?: string;
  style?: Object;
};

export class LetterpadEditor extends PureComponent<EditorProps, State> {
  static defaultProps = {
    defaultValue: "",
    placeholder: "Write something nice…",
    onImageUploadStart: () => {},
    onImageUploadStop: () => {},
    plugins: [],
    tooltip: "span"
  };

  prevSchema: Schema = null;
  schema?: Schema = null;

  serializer: Serializer;

  plugins: Plugin[];

  constructor(props) {
    super(props);
    this.serializer = Markdown;
    const builtInPlugins = createPlugins({
      placeholder: props.placeholder,
      getLinkComponent: props.getLinkComponent
    });

    this.plugins = [...props.plugins, ...builtInPlugins];

    this.state = {
      editorValue: this.serializer.deserialize(md)
    };
  }

  value = (): string => {
    return this.serializer.serialize(this.state.editorValue);
  };

  handleChange = ({ value }: { value: Value }) => {
    this.setState({ editorValue: value }, () => {
      if (this.props.onChange && !this.props.readOnly) {
        this.props.onChange(this.value);
      }
    });
  };

  getSchema = () => {
    if (this.prevSchema !== this.props.schema) {
      this.schema = {
        ...schema,
        ...(this.props.schema || {})
      };
      this.prevSchema = this.props.schema;
    }
    return this.schema;
  };

  render() {
    const {
      readOnly,
      pretitle,
      placeholder,
      onSave,
      onChange,
      onCancel,
      uploadImage,
      onSearchLink,
      onClickLink,
      onImageUploadStart,
      onImageUploadStop,
      onShowToast,
      className,
      style,
      dark,
      defaultValue,
      autoFocus,
      plugins,
      ...rest
    } = this.props;

    return (
      <div id="letterpad-editor-container">
        <GlobalStyle theme="dark" />

        <SlateReactEditor
          value={this.state.editorValue}
          plugins={this.plugins}
          onChange={this.handleChange}
          queries={queries}
          commands={commands}
          placeholder={placeholder}
          schema={this.getSchema()}
          // onKeyDown={this.handleKeyDown}
          onSave={onSave}
          onSearchLink={onSearchLink}
          onClickLink={onClickLink}
          onImageUploadStart={onImageUploadStart}
          onImageUploadStop={onImageUploadStop}
          onShowToast={onShowToast}
          readOnly={readOnly}
          spellCheck={!readOnly}
          uploadImage={uploadImage}
          pretitle={pretitle}
          options={defaultOptions}
          {...rest}
        />
      </div>
    );
  }
}

export default LetterpadEditor;
