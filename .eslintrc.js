module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
        "prettier/@typescript-eslint"
    ],
    root: true,
    env: {
        node: true,
        jest: true
    },
    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "prettier/prettier": "error"
    },
    overrides: [
        {
            files: ["*.js"],
            rules: {
                "@typescript-eslint/no-var-requires": "off"
            }
        }
    ]
};
