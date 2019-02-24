const path = require("path");

module.exports = {
  ...require("./jest.config"),
  preset: "jest-puppeteer",
  rootDir: path.join(__dirname, "../e2e/tests"),
  testRegex: ".*\\.tsx?$"
};
