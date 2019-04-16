import { getHtmlContents } from "../helpers/serialize";
import { clearEditor } from "../helpers/simple-actions";
import params from "../helpers/params";
require("@cypress/snapshot").register();

context("List", () => {
  beforeEach(() => {
    cy.visit(params.testServer);
    // cy.get('div[contenteditable="true"]');
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

  it("test merging list", () => {
    clearEditor().then(() => {
      cy.focused().type(
        "- list 1{enter}list 2{enter}{enter}- list 3{enter}{uparrow}{backspace}"
      );
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it.only("test numbered list", () => {
    clearEditor().then(() => {
      cy.focused().type(
        "1. list 1{enter}list 2{enter}{enter}This is a normal line"
      );
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
});
