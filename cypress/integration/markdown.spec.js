import { getHtmlContents } from "../helpers/serialize";
import { clearEditor } from "../helpers/simple-actions";
import params from "../helpers/params";
require("@cypress/snapshot").register();

context("Markdown", () => {
  beforeEach(() => {
    cy.visit(params.testServer);
    cy.get('div[contenteditable="true"]');
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
      cy.focused().type("[embed=http://youtube.com/embed/link]");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests embed audio", () => {
    clearEditor().then(() => {
      cy.focused().type("[audio=http://youtube.com/a.mp3]");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("tests embed gist", () => {
    clearEditor().then(() => {
      cy.focused().type(
        "[embed=https://gist.github.com/ajaxtown/c5d3ddcc0e634bdc8bfe9a4fbb7b063d?file=For.js]"
      );
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

  it.skip("tests ordered list", () => {
    clearEditor().then(() => {
      cy.focused().type("1. list 1{enter}list 2");
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });
});
