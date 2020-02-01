import InstantReplace from "slate-instant-replace";
import isUrl from "is-url";

const AddURL = (editor, lastWord) => {
  if (isUrl(lastWord)) {
    editor.moveFocusBackward(lastWord.length); // select last word
    editor.unwrapInline("link"); // remove existing urls
    const href = lastWord.startsWith("http") ? lastWord : `https://${lastWord}`;
    editor.wrapInline({ type: "link", data: { href } }); // set URL inline
    editor.moveFocusForward(lastWord.length); // deselect it
  }
};

const Replacer = InstantReplace(AddURL);

export default Replacer;
