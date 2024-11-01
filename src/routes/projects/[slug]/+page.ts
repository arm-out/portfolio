import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
	try {
		const project = await import(`../../../projects/${params.slug}.md`);
		return {
			content: project.default,
			meta: project.metadata
		};
	} catch (e) {
		console.log(e);
		throw error(404, 'Not found');
	}
}
