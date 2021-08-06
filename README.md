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

-   `theme`: **string**

    `default`: **dark**

    Set the theme. Options - light | dark

-   `onImageClick`: `() => Promise<string>`

-   `onVideoClick`: `() => Promise<string>`

-   `onChange(html: string)`: `(html:string) => void`

    Receive html whenever there is a change in the editor.

-   `html` - string

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
