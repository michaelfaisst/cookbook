/** @type {import("prettier").Config} */
module.exports = {
    plugins: [
        require.resolve("prettier-plugin-tailwindcss"),
        require.resolve("@trivago/prettier-plugin-sort-imports")
    ],
    tabWidth: 4,
    trailingComma: "none",
    importOrder: [
        "^react(.*)$",
        "^next(.*)$",
        "<THIRD_PARTY_MODULES>",
        "^@/(.*)$",
        "^[./]"
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true
};
