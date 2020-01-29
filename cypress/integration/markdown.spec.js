import { clearEditor } from "../helpers/simple-actions";
import { getHtmlContents } from "../helpers/serialize";
import params from "../helpers/params";
require("@cypress/snapshot").register();

context("Markdown", () => {
  beforeEach(() => {
    cy.visit(params.testServer);
    cy.get('div[data-slate-editor="true"]')
      .focus()
      .type("{enter}");
  });

  it("tests italic", () => {
    clearEditor().then(() => {
      cy.focused().type("__foo__{backspace}");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests bold", () => {
    clearEditor().then(() => {
      cy.focused().type("**foo**{backspace}");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
  it("tests blockquote", () => {
    clearEditor().then(() => {
      cy.focused().type("> foo");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests heading", () => {
    clearEditor().then(() => {
      cy.focused().type("# foo");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests highlight", () => {
    clearEditor().then(() => {
      cy.focused().type("`foo`");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests embed youtube", () => {
    clearEditor().then(() => {
      cy.focused().type("https://www.youtube.com/watch?v=JjJHOYIVO98{enter}");
      cy.wait(500);
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests embed gist", () => {
    clearEditor().then(() => {
      cy.focused().type(
        "https://gist.github.com/ajaxtown/c5d3ddcc0e634bdc8bfe9a4fbb7b063d?file=For.js{enter}"
      );
      cy.wait(500);
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("separator", () => {
    clearEditor().then(() => {
      cy.focused().type("--- ");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests unordered list", () => {
    clearEditor().then(() => {
      cy.focused().type("- list 1{enter}list 2");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests ordered list", () => {
    clearEditor().then(() => {
      cy.focused().type("1. list 1{enter}list 2");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
});
