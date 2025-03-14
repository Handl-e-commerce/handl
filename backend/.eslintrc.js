module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "google",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json"],
        sourceType: "module",
    },
    ignorePatterns: [
        "/build/**/*", // Ignore built files.
        "babel.config.js", // Ignore babel config file.
        "/tests/**", // Ignore tests temporarily.
        "/utils/createEmailTemplate.ts",
    ],
    plugins: [
        "@typescript-eslint",
        "import",
    ],
    rules: {
        "quotes": ["error", "double"],
        "import/no-unresolved": 0,
        "indent": ["error", 4],
        "new-cap": "off",
        "@typescript-eslint/no-var-requires": "off",
        "max-len": ["error", {"code": 120}],
    },
};
