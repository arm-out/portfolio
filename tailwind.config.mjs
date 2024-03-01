import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["ABC Monument Grotesk", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				dark: "#0f0f0f",
				fg: "#faf7ff",
				sec: "#626262",
				outline: "#1d1d1d",
			},
		},
	},
	plugins: [],
};
