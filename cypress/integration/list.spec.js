import params from "../../e2e/params";
import { getHtmlContents } from "../helpers/serialize";
import { clearEditor } from "../helpers/simple-actions";
require("@cypress/snapshot").register();

context("Markdown", () => {
  beforeEach(() => {
    cy.visit(params.testServer);
    cy.get('div[contenteditable="true"]');
  });

  it("test list", () => {
    clearEditor().then(() => {
      cy.focused().type("- list 1{enter}list 2");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
  it("test exiting list with double enter", () => {
    clearEditor().then(() => {
      cy.focused().type("- list 1{enter}list 2{enter}{enter}");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
  it("test backspace", () => {
    clearEditor().then(() => {
      cy.focused().type("- list 1{enter}list 2{enter}{backspace}");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
});
