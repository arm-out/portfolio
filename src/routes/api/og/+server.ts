import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { RequestHandler } from './$types';
import { readFileSync } from 'fs';
import Card from './Card.svelte';
import { html as toReactNode } from 'satori-html';

export const prerender = true;

const HEIGHT = 630;
const WIDTH = 1200;

const font = readFileSync(`${process.cwd()}/src/lib/MonumentGroteskRegular.woff`);

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title');
	const desc = url.searchParams.get('desc');
	const res = Card.render({ title, desc, origin: url.origin });
	const element = toReactNode(res.html);

	const svg = await satori(element, {
		fonts: [
			{
				name: 'ABC Monument Grotesk',
				weight: 400,
				style: 'normal',
				data: font
			}
		],
		height: HEIGHT,
		width: WIDTH
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: WIDTH
		}
	});
	const png = resvg.render().asPng();

	return new Response(png, {
		headers: {
			'content-type': 'image/png'
		}
	});
};
