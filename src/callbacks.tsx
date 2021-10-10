import { EditorCallbacks } from "./types";
import { callbacks as defaultCallbacks } from "./constants";

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
