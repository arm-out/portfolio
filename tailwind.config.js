import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['ABC Monument Grotesk', ...fontFamily.sans],
				mono: ['Fira Code', ...fontFamily.mono]
			},
			colors: {
				dark: '#0f0f0f',
				fg: '#faf7ff',
				sec: '#626262',
				outline: '#1d1d1d',
				arm: '#6D28D9'
			}
		}
	},
	plugins: []
};
