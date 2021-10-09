import { EditorCallbacks } from "./types";
import { callbacks as defaultCallbacks } from "./constants";

class Callbacks {
  private callbacks: EditorCallbacks = defaultCallbacks;

  set(callbacks: EditorCallbacks) {
    this.callbacks = callbacks;
  }

  getAll() {
    return this.callbacks;
  }
}
export const callbacks = new Callbacks();
