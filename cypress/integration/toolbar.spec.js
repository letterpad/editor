import { getHtmlContents } from "../helpers/serialize";
import { clearEditor, clickXPath } from "../helpers/simple-actions";
import params from "../helpers/params";
require("@cypress/snapshot").register();

context("Toolbar", () => {
  beforeEach(() => {
    cy.visit(params.testServer);
    cy.get('div[contenteditable="true"]');
  });

  it("tests heading", () => {
    clearEditor().then(() => {
      cy.get("#letterpad-editor-toolbar-toggle-button").click();

      clickXPath("//span[contains(text(), 'looks_one')]");
      cy.get('div[contenteditable="true"]')
        .type("heading")
        .then(() => {
          getHtmlContents().then(res => {
            cy.wrap(res).snapshot();
          });
        });
    });
  });

  it("tests audio", () => {
    clearEditor().then(() => {
      cy.get("#letterpad-editor-toolbar-toggle-button").click();

      clickXPath("//span[contains(text(), 'queue_music')]");
      cy.focused()
        .type("foo.mp3{enter}")
        .then(() => {
          getHtmlContents().then(res => {
            cy.wrap(res).snapshot();
          });
        });
    });
  });

  it("tests image", () => {
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

  it("tests horizontal line", () => {
    clearEditor().then(() => {
      cy.get("#letterpad-editor-toolbar-toggle-button").click();

      clickXPath("//span[contains(text(), 'more_horiz')]");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
});
