const config = require("./jest.config");

const e2eConfig = {
  ...config,
  testMatch: ["**/*.controller.test.ts"]
};

module.exports = e2eConfig