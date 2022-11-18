/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                ingredientsForm: "100px 200px 300px 24px",
                instructionsForm: "auto 1fr auto"
            }
        }
    },
    plugins: []
};
