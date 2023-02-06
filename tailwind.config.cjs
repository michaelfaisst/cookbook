/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            title: ["Libre Baskerville", "ui-serif", "system-ui"]
        },
        extend: {
            gridTemplateColumns: {
                ingredientsForm: "100px 200px 300px 24px",
                instructionsForm: "auto 1fr auto"
            },
            fontFamily: {
                sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans]
            }
        }
    },
    plugins: [require("@tailwindcss/forms")]
};
