# Letterpad Editor

This editor is an extract from the
[Letterpad CMS](http://github.com/letterpad/letterpad-cms).

This editor gives a high level api of the [draft editor](https://draftjs.org/) along with a flexible plugin architecture.

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

- `theme`: **string**

  `default`: **dark**

  Set the theme. Options - light | dark

- `setHelpers`: `(props: Helpers) => void`

  You may want to store these props in some state, so that you can access them anytime. See below:

  ```jsx
  import { Helpers } from "letterpad-editor/dist/types";
  import LetterpadEditor from "letterpad-editor";

  const MyEditor = () => {
    const [helpers, setHelpers] = useState<Helpers>();

    const insertImage = () => {
      helpers.pluginHelpers.imagePlugin.insertImage({
        src: "https://example.com/image.jpg",
        caption: "caption",
        width: 300,
        height: 200,
        placeholderSrc: "https://example.com/1x1.jpg"
      });
    };

    return (
      <div>
        <LetterpadEditor
          theme="dark"
          onChange={(html: string) => {
            console.log(html);
          }}
          html="Hello World"
          setHelpers={setHelpers}
        />
        <button onClick={insertImage}>Insert Image</button>
      </div>
    );
  };
  ```

  ```js
  // Helpers
  {
    pluginHelpers, // instance of each plugin by name
    getPlugins, // a function returning a list of all the plugins
    getProps, // a function returning a list of all the props pass into the Editor
    setEditorState, // a function to update the EditorState
    getEditorState, // a function to get the current EditorState
    getReadOnly, // a function returning of the Editor is set to readOnly
    setReadOnly, // a function which allows to set the Editor to readOnly
    getEditorRef, // a function to get the editor reference
  }
  ```

- `onImageClick`: `((insert: TypeInsertImageFn) => void)`

  `insert` is a callback function. You may want to upload the image to the server first and then provide a url. eg.

  ```jsx
    ...
    onImageClick={insert => {
      // display file explorer
      // on select image, get the urls and some additional info
      insert({
        src,
        caption,
        width,
        height,
        placeholderSrc
      })
    }}
    ...
  ```

  **Scenario**:
  If a user is uploading an image, you might want to show some sort of a loading placeholder in the editor. And then when the image has uploaded, you
  will have to replace the placeholder. You can do so in this way.

  ```jsx
  import { Helpers } from "letterpad-editor/dist/types";
  import LetterpadEditor from "letterpad-editor";

  const MyEditor = () => {
  const [helpers, setHelpers] = useState<Helpers>();

  const insertImage = () => {
    const image = getImageFromUser(); // implement this method.

    const key = helpers.pluginHelpers.imagePlugin.insertImage({
      src: "https://example.com/placeholder.svg"
    });

    const uploadedSrc = await uploadImageToServer(image);

    const key = helpers.pluginHelpers.imagePlugin.updateImageBlock(key, {
      src: uploadedSrc
    });
  };

  return (
    <div>
      <LetterpadEditor
        theme="dark"
        onChange={(html: string) => {
          console.log(html);
        }}
        html="Hello World"
        setHelpers={setHelpers}
      />
      <button onClick={insertImage}>Insert Image</button>
    </div>
  );
  };
  ```

- `onVideoClick`: `((insert: (url:string) => void) => void)`

- `onChange(html: string)`: `(html:string) => void`

  Receive html whenever there is a change in the editor.

- `html` - string

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
