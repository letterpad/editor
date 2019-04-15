import { getHtmlContents } from "../helpers/serialize";
// require("../helpers/util");
import { clearEditor, repeatKey, clickXPath } from "../helpers/simple-actions";
import {
  applyEditorFeatureToSampleText,
  applyEditorFeatureToLine
} from "../helpers/compound-actions";
import params from "../../e2e/params";

require("@cypress/snapshot").register();

context("Actions", () => {
  beforeEach(() => {
    cy.visit(params.testServer);
    cy.get('div[contenteditable="true"]');
  });

  // it("clearing editor", async () => {
  //   await clearEditor();
  //   cy.wrap(await getHtmlContents()).snapshot();
  // });

  it("bold", async () => {
    await clearEditor();
    await applyEditorFeatureToSampleText(
      "//span[contains(text(), 'format_bold')]"
    );
    cy.wrap(await getHtmlContents()).snapshot();
  });

  it("italics", async () => {
    await clearEditor();
    await applyEditorFeatureToSampleText(
      "//span[contains(text(), 'format_italic')]"
    );
    cy.wrap(await getHtmlContents()).snapshot();
  });

  it("underline", async () => {
    await clearEditor();
    await applyEditorFeatureToSampleText(
      "//span[contains(text(), 'format_underline')]"
    );
    cy.wrap(await getHtmlContents()).snapshot();
  });

  it("headings", async () => {
    await clearEditor();
    await applyEditorFeatureToLine("//span[contains(text(), 'looks_two')]");
    cy.wrap(await getHtmlContents()).snapshot();
    await clearEditor();
    await applyEditorFeatureToLine("//span[contains(text(), 'looks_3')]");
    cy.wrap(await getHtmlContents()).snapshot();
  });

  it("blockquote", async () => {
    await clearEditor();
    await applyEditorFeatureToLine("//span[contains(text(), 'format_quote')]");
    cy.wrap(await getHtmlContents()).snapshot();
  });
});
