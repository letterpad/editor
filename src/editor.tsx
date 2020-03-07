import { Editor, SchemaProperties, Value } from "slate";
import {
  ICustomToolbar,
  IPlugin,
  ISearchResult,
  ISerializer,
  TypeLinkComponent
} from "./types";
import React, { PureComponent } from "react";

import { GlobalStyle } from "./themes/Global.css";
import Markdown from "./serializer";
import { Editor as SlateReactEditor } from "slate-react";
import commands from "./commands";
import createPlugins from "./plugins/plugins";
import { getHtmlFromMarkdown } from "./mdToHtml";
import queries from "./queries";
import schema from "./helper/schema";

const defaultOptions = {};

export const letterpadId = "letterpad-editor-container";
export const letterpadClassName = "lp-editor";

type State = {
  editorValue: Value;
};

export type EditorProps = {
  id?: string;
  defaultValue: string;
  placeholder: string;
  title?: string;
  plugins: IPlugin[];
  readOnly?: boolean;
  dark?: boolean;
  schema?: SchemaProperties;
  uploadImage?: (file: File) => Promise<string>;
  onSave?: ({ done }: { done?: boolean }) => void;
  onChange: (value: () => { markdown: string; html: string }) => void;
  onSearchLink?: (term: string) => Promise<ISearchResult[]>;
  onClickLink?: (href: string) => void;
  onShowToast?: (message: string) => void;
  onImageBrowse?: () => void;
  getLinkComponent?: TypeLinkComponent;
  getEditorInstance?: (editor: Editor) => void;
  style?: string;
  addToToolbar?: ICustomToolbar[];
};

export class LetterpadEditor extends PureComponent<EditorProps, State> {
  static defaultProps = {
    defaultValue: "",
    placeholder: "Write something nice…",
    plugins: [],
    tooltip: "span",
    dark: false,
    readOnly: false,
    addToToolbar: []
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
          this.editor = editor;
        }
        return next();
      }
    };
    this.plugins = [...props.plugins, ...builtInPlugins, getSlateInstance];

    this.state = {
      editorValue: this.serializer.deserialize(props.defaultValue)
    };
  }

  value = () => {
    const markdown = this.serializer.serialize(this.state.editorValue);
    const html = getHtmlFromMarkdown(markdown, this.editor);

    return { markdown, html };
  };

  handleChange = ({ value }: { value: Value }) => {
    this.setState({ editorValue: value }, () => {
      if (this.props.onChange && !this.props.readOnly) {
        this.props.onChange(this.value);
      }
    });
  };

  getSchema = () => {
    if (
      this.props.schema !== undefined &&
      this.props.schema !== this.prevSchema
    ) {
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
      title,
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
      addToToolbar,
      ...rest
    } = this.props;

    const theme = dark ? "dark" : "light";
    return (
      <div id={letterpadId} className={letterpadClassName}>
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
          title={title}
          options={defaultOptions}
          addToToolbar={addToToolbar}
          {...rest}
        />
      </div>
    );
  }
}
export default LetterpadEditor;
