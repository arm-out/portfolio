import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { enhancedImages } from 'mdsvex-enhanced-images';
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOpts = {
	extensions: ['.md'],
	remarkPlugins: [enhancedImages]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [vitePreprocess(), mdsvex(mdsvexOpts)],

	kit: {
		adapter: adapter()
	}
};

export default config;
