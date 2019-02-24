import { EditorHandle } from "./serialize";
import { clearEditor, repeatKey, clickXPath } from "./simple-actions";

export async function applyEditorFeatureToLine(
  editorHandle: EditorHandle,
  xPath: string
) {
  await clearEditor(editorHandle);
  await page.keyboard.type("These is a sample line of text");

  // select some text to show the menubar
  await page.keyboard.down("Shift");
  await repeatKey("ArrowLeft", 1);
  await page.keyboard.up("Shift");

  // find and click
  await clickXPath(xPath);
}

export async function applyEditorFeatureToSampleText(
  editorHandle: EditorHandle,
  xPath: string
) {
  await clearEditor(editorHandle);
  await page.keyboard.type("This is a sample text");
  await repeatKey("ArrowLeft", 5); // move 5 left
  await page.keyboard.down("Shift");
  await repeatKey("ArrowLeft", 6); // move 6 left
  await page.keyboard.up("Shift");
  await page.waitFor(50);
  await clickXPath(xPath);
}

export async function fillSampleList(editorHandle: EditorHandle) {
  await clearEditor(editorHandle);
  await page.keyboard.type("- Item 1");
  await page.keyboard.press("Enter");
  await page.keyboard.type("Item 2");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await page.keyboard.type("Item 2.1");
  await page.keyboard.press("Enter");
  await page.keyboard.type("Item 2.2");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await page.keyboard.type("Item 2.2.1");
  await page.keyboard.press("Enter");
  await page.keyboard.type("Item 2.2.2");
  await page.keyboard.press("Enter");
  await page.keyboard.type("Item 2.2.3");
}
