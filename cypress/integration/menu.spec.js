import { getHtmlContents } from "../helpers/serialize";
import { clearEditor } from "../helpers/simple-actions";
import {
  applyEditorFeatureToSampleText,
  applyEditorFeatureToLine
} from "../helpers/compound-actions";
import params from "../helpers/params";

require("@cypress/snapshot").register();

context("Menu", () => {
  beforeEach(() => {
    cy.visit(params.testServer);
    cy.get('div[contenteditable="true"]');
  });

  it("clearing editor", () => {
    clearEditor().then(() => {
      getHtmlContents().then(res => {
        cy.wrap(res).snapshot();
      });
    });
  });

  it("bold", () => {
    clearEditor().then(() => {
      applyEditorFeatureToSampleText(
        "//span[contains(text(), 'format_bold')]"
      ).then(() => {
        getHtmlContents().then(res => {
          cy.wrap(res).snapshot();
        });
      });
    });
  });

  it("italics", () => {
    clearEditor().then(() => {
      applyEditorFeatureToSampleText(
        "//span[contains(text(), 'format_italic')]"
      ).then(() => {
        getHtmlContents().then(res => {
          cy.wrap(res).snapshot();
        });
      });
    });
  });

  it("underline", () => {
    clearEditor().then(() => {
      applyEditorFeatureToSampleText(
        "//span[contains(text(), 'format_underline')]"
      ).then(() => {
        getHtmlContents().then(res => {
          cy.wrap(res).snapshot();
        });
      });
    });
  });

  it("headings 2", () => {
    clearEditor().then(() => {
      applyEditorFeatureToLine("//span[contains(text(), 'looks_two')]").then(
        () => {
          getHtmlContents().then(res => {
            cy.wrap(res).snapshot();
          });
        }
      );
    });
  });

  it("headings 3", () => {
    clearEditor().then(() => {
      applyEditorFeatureToLine("//span[contains(text(), 'looks_3')]").then(
        () => {
          getHtmlContents().then(res => {
            cy.wrap(res).snapshot();
          });
        }
      );
    });
  });

  it("blockquote", () => {
    clearEditor().then(() => {
      applyEditorFeatureToLine("//span[contains(text(), 'format_quote')]").then(
        () => {
          getHtmlContents().then(res => {
            cy.wrap(res).snapshot();
          });
        }
      );
    });
  });
});
