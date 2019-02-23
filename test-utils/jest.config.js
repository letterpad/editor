/**
 * Base jest configuration
 */
module.exports = {
  collectCoverageFrom: ["!**/__tests__/*", "!**/__benchmarks__/*", "**/*.ts"],
  coveragePathIgnorePatterns: ["^.+\\.d\\.ts$"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  rootDir: __dirname + "/../"
};
