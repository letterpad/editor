// import { cy } from "./serialize";
import { clearEditor, repeatKey, clickXPath } from "./simple-actions";

export async function applyEditorFeatureToLine(xPath) {
  return new Promise(resolve => {
    cy.get('div[contenteditable="true"]').then(() => {
      cy.focused()
        .type("These is a sample line of text{selectAll}")
        .then(() => {
          clickXPath(xPath);
          resolve();
        });
    });
  });
}

export async function applyEditorFeatureToSampleText(xPath) {
  return new Promise(resolve => {
    cy.get('div[contenteditable="true"]').then(() => {
      cy.focused()
        .type("This is a sample text{selectAll}")
        .then(() => {
          clickXPath(xPath);
          resolve();
        });
    });
  });
  // await cy.focused().type("{selectall}{rightarrow}{rightarrow}");
  // // .setSelection("sample");
  // await repeatKey("{leftarrow}", 5); // move 5 left
  // await cy.focused().type("{shift}", { release: false });
  // await repeatKey("{shift}{leftarrow}", 6); // move 6 left
  // await cy.focused().type("{shift}", { release: true });
  // // await cy.focused().type("{selectAll}");
  // await clickXPath(xPath);
}

export async function fillSampleList(cy) {
  await clearEditor(cy);
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
