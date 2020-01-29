# Letterpad Editor

This editor is an extract from the
[Letterpad CMS](http://github.com/letterpad/letterpad-cms).

[![Build Status](https://travis-ci.com/letterpad/editor.svg?branch=master)](https://travis-ci.com/letterpad/editor)

This editor gives a high level api of the [slate editor](https://slatejs.org) along with a flexible plugin architecture.

### How to use

```sh
// using yarn
yarn add letterpad-editor

//using npm
npm install letterpad-editor
```

Now you can use this in your react project

```js
import React from "react";
import LetterpadEditor from "letterpad-editor";

const MyEditor = () => {
  return (
    <LetterpadEditor
      theme="dark"
      spellCheck={false}
      defaultFont={true}
      onChange={(html: string) => {
        console.log(html);
      }}
      html="Hello World"
    />
  );
};

export default MyEditor;
```

| Props          | Description                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue` | Markdown content                                                                                                             |
| `placeholder`  | Override the default text. (default: "Write something nice")                                                                 |
| `readOnly`     | Setting this to true will not allow the user to edit                                                                         |
| `autoFocus`    | Focus the document automatically on load                                                                                     |
| `spellCheck`   | Allow spellchecking. (default: true)                                                                                         |
| `plugins`      | Allow additional plugins matching SlateJS API                                                                                |
| `schema`       | Allow additional schema to be passed to Slate Editor                                                                         |
| `dark`         | Set this to true to use the dark theme. (default: light)                                                                     |
| `style`        | You can pass css string to override the defaults. eg. "body {font-size: 18px}" <br> Look for base.css to see the default css |

Callback options

| Props                    | Description                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `uploadImage`            | This function is called a user uploads an image.<pre><Editor <br> uploadImage={async file => { <br> const result = await upload(file);<br> }<br>/></pre>         |
| `onSave(done: boolean)`  | This is called when the user uses shortcut keys (Ctrl+S or Cmd+S) to save the document. (Ctrl+Enter or Cmd+Enter) is to save and exist and sets done to true.    |
| `onChange(() => value)`  | This is called when the content is edited. Remember that callback is a function and when its called, it serializes the JSON value to markdown                    |
| `onClickLink(href)`      | This callback can be used to override link handling. You may want to open external link in new tab and internal link in the same tab.                            |
| `getLinkComponent(Node)` | The editor automatically detects a wide variety of links (youtube, soundcloud, vimeo, gist, figma, etc). However, you may override this by returning a component |

## Development

```sh
git clone git@github.com:letterpad/editor.git
cd editor
yarn install
yarn dev
```

### Tests

Most part is covered with integration tests using Cypress.

```sh
# Run all tests locally
yarn bundle # build the bundle
yarn e2e # validate the bundle
```
