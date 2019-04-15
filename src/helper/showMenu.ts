import { Value } from "slate";

// When the menu positioning is beyond the screen, leave a padding
// of DEFAULT_MARGIN to the side and the top
const DEFAULT_MARGIN = 5;

export const showMenu = (menu: HTMLElement, value: Value) => {
  const { fragment, selection } = value;

  if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
    menu.removeAttribute("style");
    return;
  }

  const native = window.getSelection();
  if (!native) return false;
  const range = native.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  menu.style.opacity = "1";
  let top = rect.top + window.pageYOffset - menu.offsetHeight;
  if (top < DEFAULT_MARGIN) {
    top = DEFAULT_MARGIN;
  }

  let left =
    rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2;
  if (left < DEFAULT_MARGIN) {
    left = DEFAULT_MARGIN;
  }

  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
};
