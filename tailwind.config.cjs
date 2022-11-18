/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                ingridientsForm: "24px 100px 200px 300px"
            }
        }
    },
    plugins: []
};
