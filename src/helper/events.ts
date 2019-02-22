export function isKeyboardEvent(event: Event): event is KeyboardEvent {
  if (Object.prototype.hasOwnProperty.call(event, "key")) {
    return true;
  }
  return false;
}
