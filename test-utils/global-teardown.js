const { teardown } = require("jest-environment-puppeteer");
module.exports = config => {
  return teardown(config);
};
