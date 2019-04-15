require("cypress-xpath");

export async function repeatKey(key, times) {
  for (let i = 0; i < times; i++) {
    await cy.focused().type(key);
  }
}

export async function clearEditor() {
  return new Promise((resolve, reject) => {
    cy.window().then(win => {
      win.__letterpadEditor.moveToRangeOfDocument();
      cy.focused()
        .type("{backspace}", { force: true })
        .then(resolve);
    });
  });
}

export async function clickXPath(xPath) {
  const ele = cy.xpath(xPath);
  if (ele.length > 0) {
    ele.click({ multiple: true });
  } else {
    ele.click();
  }
}
