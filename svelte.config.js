import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { enhancedImages } from 'mdsvex-enhanced-images';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import shikiColorizedBrackets from '@michael-makes/shiki-colorized-brackets';

const highlighter = await createHighlighter({
	themes: ['material-theme-darker'],
	langs: ['ts']
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOpts = {
	extensions: ['.md'],
	layout: {
		_: './src/mdsvex.svelte'
	},
	highlight: {
		highlighter: async (code, lang = 'text', file) => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme: 'material-theme-darker',
					colorReplacements: { '#f07178': '#82aaff', '#212121': '#121212' },
					transformers: [shikiColorizedBrackets()]
				})
			);

			if (!file) {
				return `{@html \`${html}\`}`;
			}

			const open = `<div class="test"> <div class="italic text-sec font-light pl-2 w-full">${file}</div>`;
			const close = `</div>`;

			return `${open} {@html \`${html}\`} ${close}`;
		}
	},
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
