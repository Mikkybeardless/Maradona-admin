/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            ...colors,
            defaultOrange: "#E65800",
            defaultOrangeHover: "#b74600",
            secondaryOrange: "#FFF1E9",
            primaryBorder: "#DED9DD",
            secondaryTextColor: "#585858",
        },
        screens: {
            sm: "425px",
            md: "769px",
            lg: "1024px",
            mxl: "1150px",
            xl: "1286px",
            "2xl": "1536px",
        },
        extend: {},
    },
    plugins: [],
}
