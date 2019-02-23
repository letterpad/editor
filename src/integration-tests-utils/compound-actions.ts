import { EditorHandle } from "./serialize";
import { clearEditor, repeatKey } from "./simple-actions";

export async function applyEditorFeatureToSampleText(
  editorHandle: EditorHandle,
  xPath: string
) {
  await clearEditor(editorHandle);
  await page.keyboard.type("This is a sample text");
  const textHandlers = await page.$x("//span[contains(text(), 'sample')]");
  if (textHandlers.length < 1) {
    throw new Error("Expected at least 1 matching textHandler");
  }

  await repeatKey("ArrowLeft", 5); // move 5 left
  await page.keyboard.down("Shift");
  await repeatKey("ArrowLeft", 6); // move 6 left
  await page.keyboard.up("Shift");
  await page.keyboard.down("Meta");
  await page.keyboard.press("b");
  await page.keyboard.up("Meta");
  await page.waitFor(50);

  const featureHandlers = await page.$x(xPath);
  if (featureHandlers.length < 1) {
    throw new Error(`Feature Button xpath="${xPath}" not found`);
  }

  featureHandlers[0].click();
  await page.waitFor(50);
}
