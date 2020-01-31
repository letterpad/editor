import { Editor, SchemaProperties, Value } from "slate";
import {
  IEmbedProvider,
  IPlugin,
  ISearchResult,
  ISerializer,
  TypeIframeProps
} from "./types";
import React, { PureComponent } from "react";

import { GlobalStyle } from "./themes/Global.css";
import Markdown from "./serializer";
import { Editor as SlateReactEditor } from "slate-react";
import commands from "./commands";
import createPlugins from "./plugins/plugins";
import queries from "./queries";
import schema from "./helper/schema";

const defaultOptions = {};

type State = {
  editorValue: Value;
};

export type EditorProps = {
  id?: string;
  defaultValue: string;
  placeholder: string;
  pretitle?: string;
  plugins: IPlugin[];
  readOnly?: boolean;
  dark?: boolean;
  schema?: SchemaProperties;
  uploadImage?: (file: File) => Promise<string>;
  onSave?: ({ done }: { done?: boolean }) => void;
  onChange: (value: () => string) => void;
  onSearchLink?: (term: string) => Promise<ISearchResult[]>;
  onClickLink?: (href: string) => void;
  onShowToast?: (message: string) => void;
  onImageBrowse?: () => void;
  getLinkComponent?: (
    node: Node,
    attrs: TypeIframeProps
  ) => React.ComponentType<any> | void;
  getEditorInstance?: (editor: Editor) => void;
  style?: string;
};

export class LetterpadEditor extends PureComponent<EditorProps, State> {
  static defaultProps = {
    defaultValue: "",
    placeholder: "Write something nice…",
    plugins: [],
    tooltip: "span",
    dark: false,
    readOnly: false
  };

  prevSchema: SchemaProperties = null;
  schema?: SchemaProperties = null;

  serializer: ISerializer;
  editor: Editor = null;
  plugins: Plugin[];

  constructor(props: EditorProps) {
    super(props);
    this.serializer = Markdown;
    const builtInPlugins = createPlugins({
      placeholder: props.placeholder,
      getLinkComponent: props.getLinkComponent
    });

    const getSlateInstance = {
      renderEditor: (_, editor: Editor, next: Function) => {
        if (editor && props.getEditorInstance && !this.editor) {
          props.getEditorInstance(editor);
        }
        return next();
      }
    };
    this.plugins = [...props.plugins, ...builtInPlugins, getSlateInstance];

    this.state = {
      editorValue: this.serializer.deserialize(props.defaultValue)
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
      uploadImage,
      onSearchLink,
      onClickLink,
      onShowToast,
      style,
      dark,
      defaultValue,
      plugins,
      onImageBrowse,
      ...rest
    } = this.props;

    const theme = dark ? "dark" : "light";
    return (
      <div id="letterpad-editor-container">
        <GlobalStyle theme={theme} style={style} />
        <SlateReactEditor
          value={this.state.editorValue}
          plugins={this.plugins}
          onChange={this.handleChange}
          queries={queries}
          commands={commands}
          placeholder={placeholder}
          schema={this.getSchema()}
          onSave={onSave}
          onSearchLink={onSearchLink}
          onClickLink={onClickLink}
          onShowToast={onShowToast}
          readOnly={readOnly}
          spellCheck={!readOnly}
          uploadImage={uploadImage}
          onImageBrowse={onImageBrowse}
          pretitle={pretitle}
          options={defaultOptions}
          {...rest}
        />
      </div>
    );
  }
}

export default LetterpadEditor;
