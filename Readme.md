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

### Options

| Option              |    Value     | Default |
| ------------------- | :----------: | ------: |
| theme(string)       | dark , light |   light |
| spellCheck(boolean) | true, false  |    true |
| onChange (function) |              |         |
| html                |              |         |
