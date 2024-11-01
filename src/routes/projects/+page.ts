import type { Project } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	let projects: Project[] = [];

	const paths = import.meta.glob('/src/projects/*.md', { eager: true });
	for (const path in paths) {
		if (path === '/src/projects/_template.md') continue;

		const file = paths[path];
		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as Project;
			const p = { ...metadata } satisfies Project;
			projects.push(p);
		}
	}

	projects = projects.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return { projects };
};
