export const applyLinebreak = (editor, type) => {
  return editor.insertBlock({
    type: type,
    isVoid: true
  });
};
