import { Value } from "slate";

export const showMenu = (menu: HTMLElement, value: Value) => {
  const { fragment, selection } = value;

  if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
    menu.removeAttribute("style");
    return;
  }

  const native = window.getSelection();
  const range = native.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  menu.style.opacity = "1";
  menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

  menu.style.left = `${rect.left +
    window.pageXOffset -
    menu.offsetWidth / 2 +
    rect.width / 2}px`;
};
