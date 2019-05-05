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

### Parameters

- `theme`: **string**

  `default`: **dark**

  Set the theme. Options - light | dark

- `spellCheck`: **boolean**

  `default`: **true**

  Activate Spell check. Options - true | false

- `onChange(html: string)`: **Function**

  Receive html whenever there is a change in the editor.

- `onButtonClick(event, type: string, callbacks)`: **Function**

  Whenever a plugin is applied by clicking the button in the floating menu or the toolbar, you can capture that event with this hook.

  ```js
  event: MouseEvent;
  type: TagName; // img, strong, link, etc
  callbacks: Object;
  ```

- `onBeforeRender(renderType, type, props)`: **Function**

  This hook is triggered before applying a transformation. You will be able to change the markup dynamically using this.

  ```js
  onBeforeRender = (renderType, props) => {
    if (type == "strong") {
      return <b>{props.children}</b>;
    }
  };
  ```

- `html` - string | null

  `default`: null

  Load the initial html. If you want empty page, the enter empty string. If its null, it will load sample data.

## Development

If you would like to contribute then setup your dev environment this way.

You will find some documentation over here - https://app.gitbook.com/@letterpad/s/editor/

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
