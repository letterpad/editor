declare module "slate-auto-replace" {
  import { Plugin } from "slate-react";
  import { List } from "immutable";
  import { Operation, Value, Editor } from "slate";

  export interface AutoReplaceParams {
    trigger: string;
    before: RegExp;
    change: (editor: Editor, event: Event, matched: any) => Editor;
  }

  function AutoReplace(params: AutoReplaceParams): Plugin;
  export default AutoReplace;
}
