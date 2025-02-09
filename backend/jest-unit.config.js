const config = require("./jest.config");

const unitConfigs = {
  ...config,
  testMatch: ["**/*.test.ts"],
};

module.exports =  unitConfigs;
