const config = require("./jest.config");

const unitConfigs = {
  ...config,
  testMatch: ["src/**/*.test.ts"],
};

module.exports =  unitConfigs;
