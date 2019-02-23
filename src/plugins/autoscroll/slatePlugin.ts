import scrollToCursor from "../../helper/scrollToCursor";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

const AutoScrollPlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown(event, _, next) {
      if (
        isKeyboardEvent(event) &&
        (event.key == "Enter" || event.key == "Backspace")
      ) {
        event.preventDefault();
        scrollToCursor();
      }
      return next();
    }
  };
};

export { AutoScrollPlugin };
