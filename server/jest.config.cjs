module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};


/*const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;


export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};*/