import { clearEditor, clickXPath } from "../helpers/simple-actions";

import { getHtmlContents } from "../helpers/serialize";
import params from "../helpers/params";

require("@cypress/snapshot").register();

context("Toolbar", () => {
  beforeEach(() => {
    cy.visit(params.testServer);
    cy.get('div[contenteditable="true"]');
  });

  xit("tests heading", () => {
    clearEditor().then(() => {
      cy.get("#letterpad-editor-toolbar-toggle-button").click();

      clickXPath("//span[contains(text(), 'h1')]");
      cy.get('div[contenteditable="true"]')
        .type("heading")
        .then(() => {
          getHtmlContents().then(res => {
            cy.wrap(res).snapshot();
          });
        });
    });
  });

  xit("tests image", () => {
    clearEditor().then(() => {
      cy.get("#letterpad-editor-toolbar-toggle-button").click();
      clickXPath("//span[contains(text(), 'image')]");
      cy.focused()
        .type("foo.img{enter}")
        .then(() => {
          getHtmlContents().then(res => {
            cy.wrap(res).snapshot();
          });
        });
    });
  });

  xit("tests horizontal line", () => {
    clearEditor().then(() => {
      cy.get("#letterpad-editor-toolbar-toggle-button").click();

      clickXPath("//span[contains(text(), 'more_horiz')]");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
});
