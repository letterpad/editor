### Letterpad Editor

The letterpad editor is a high level API of the [slatejs](https://slatejs.org) editor with a robust plugin architecture. It comes with a set of rich plugins (each plugin is a feature) which can be extended to build more complex features. The editor also has markdown capabilites which generates inline previews as you start writing in markdown. This page is editable and is the playground of this editor. The toolbars are visible when you select some text or in a new line.

---

Letterpad editor uses the below technologies.

- React
- Slatejs
- Typescript
- Styled Components
- Webpack
- Cypress

We have decent documentation, if you would like to contribute to its development. Visit our [github page](https://github.com/letterpad/editor) for more information.

> Most part is covered with integration tests using Cypress. So its easy to figure out if something broke due to your change.

You can develop plugins like the one below. This is a gallery plugin.

![alt text 123](https://i.ibb.co/BrKGd4m/2.jpg "Logo Title Text 1")
![alt text](https://i.ibb.co/vHftK2F/8.jpg "Logo Title Text 1")

![alt text](https://i.ibb.co/G024j31/7.jpg "Logo Title Text 1")
![alt text](https://i.ibb.co/DWvD3zm/3.jpg "Logo Title Text 1")
![alt text](https://i.ibb.co/jghS0d7/1.jpg "Logo Title Text 1")
![alt text](https://i.ibb.co/WPWL05f/6.jpg "Logo Title Text 1")
![alt text](https://i.ibb.co/7bdT8Pn/4.jpg "Logo Title Text 1")
![alt text](https://i.ibb.co/YyYh91g/5.jpg "Logo Title Text 1")

---

You can embed media. Lets embed a youtube video.

[https://www.youtube.com/watch?v=JjJHOYIVO98](https://www.youtube.com/watch?v=JjJHOYIVO98)

You can also embed a **souncloud track** or a **website** or a **gist**. You can nicely highlight the words that need attention.

---

You can also have an image with different sizes to complement the content around it.

<figure data-id="plugin-image-figure" class="sc-dnqmqq ddNnLR"><span type="wide" src="https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80" class="lp_img_wrapper sc-iwsKbI cBgxay">![](https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80 "You may add a caption here. Click on it to make it editable.")</span></figure>

Do you write code ? We have something for you. Its not pretty, but it works.

```javascript
import React from "react";
import { render } from "react-dom";
import LetterpadEditor from "letterpad-editor";

render(<LetterpadEditor />, document.getElementById("app"));
```

However, you can add gists like so.

[https://gist.github.com/ajaxtown/f6b234dc10c42b32a503b574e3fc6b58](https://gist.github.com/ajaxtown/f6b234dc10c42b32a503b574e3fc6b58)

Headings look like this:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

Texts can be **bold and strong** or they can be **italic** and **underline**.

Lets try to embed a soundcloud track. You can customize the height of embeds. Its just a iframe property.

[https://soundcloud.com/its-deeper-sounds/alberto-jossue-deeper-sounds-mambo-radio-recorded-live-coda-dec-2019-110120](https://soundcloud.com/its-deeper-sounds/alberto-jossue-deeper-sounds-mambo-radio-recorded-live-coda-dec-2019-110120)

We have giphy plugin to insert a giphy using a search. You will find the giphy icon on the toolbar (new line).

You can also embed plain audio like mp3\. Its not very clean but you can enhance this feature.

<audio controls="" id="plugin-audio"></audio>

---

Oh you can also have a parallax image.

![alt text](https://i.ibb.co/vHftK2F/8.jpg "Logo Title Text 1")

If you have any ideas on some interesting plugin, you can [post them here](https://github.com/letterpad/editor/issues/new).
