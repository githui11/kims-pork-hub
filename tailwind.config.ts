import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Dark Premium Palette
                black: "#050505", // Rich Black
                charcoal: "#121212", // Card BG
                gold: {
                    DEFAULT: "#D4AF37", // Metallic
                    light: "#F0E68C", // Section Headings
                    soft: "#E8D5B7", // Main Headings
                    bright: "#FFD700", // Highlights/CTA
                },
                "burnt-orange": "#E67E22",
                "deep-red": "#DC143C",
                "light-gray": "#D4D4D4",
                "medium-gray": "#A0A0A0",
                cream: "#F5F1E8", // Keep for specific accents if needed
            },
            fontFamily: {
                // System Serif Typography - Classic Editorial Style
                display: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
                section: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
                body: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
                nav: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
                btn: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
                accent: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
                serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
                sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
            },
            letterSpacing: {
                "tighter-extra": "-0.04em",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
