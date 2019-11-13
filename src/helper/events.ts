export function isKeyboardEvent(event: React.KeyboardEvent<Element>) {
  if (Object.prototype.hasOwnProperty.call(event, "key")) {
    return true;
  }
  return false;
}
