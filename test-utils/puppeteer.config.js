const path = require("path");

module.exports = {
  ...require("./jest.config"),
  preset: "jest-puppeteer",
  rootDir: path.join(__dirname, "../e2e/tests"),
  testRegex: ".*\\.tsx?$",
  globalSetup: path.join(__dirname, "global-setup.js")
};
