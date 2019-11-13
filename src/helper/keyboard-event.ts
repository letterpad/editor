import { isKeyboardEvent } from "./events";

export const isMod = (event: React.KeyboardEvent<Element>) => {
  if (!isKeyboardEvent(event)) {
    return false;
  }
  if ((event.metaKey && !event.ctrlKey) || event.ctrlKey) {
    return true;
  }
  return false;
};
