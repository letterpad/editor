export const applyAudio = (editor, type, src) =>
    editor.setBlocks({ type, data: { src } });
