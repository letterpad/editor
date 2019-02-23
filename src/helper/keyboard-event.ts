import { isKeyboardEvent } from "./events";

export const isMod = (event: Event): event is KeyboardEvent => {
  if (!isKeyboardEvent(event)) {
    return false;
  }
  if ((event.metaKey && !event.ctrlKey) || event.ctrlKey) {
    return true;
  }
  return false;
};
