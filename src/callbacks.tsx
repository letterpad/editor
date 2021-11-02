import { EditorCallbacks } from "@src/types";
import { callbacks as defaultCallbacks } from "@src/constants";

/**
 * Its handy to call the user callbacks from anywhere.
 * For eg. the image plugin can call the `onImageClick` callback
 * on clicking the image icon button in the toolbar.
 */
class Callbacks {
  private callbacks: EditorCallbacks = defaultCallbacks;

  set(callbacks: EditorCallbacks) {
    this.callbacks = callbacks;
  }

  getAll() {
    return this.callbacks;
  }
}

// Allow only one instance
export const callbacks = new Callbacks();
