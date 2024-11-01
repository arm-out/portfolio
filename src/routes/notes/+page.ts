import type { Note } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	let notes: Note[] = [];

	const paths = import.meta.glob('/src/notes/*.md', { eager: true });
	for (const path in paths) {
		if (path === '/src/notes/_template.md') continue;

		const file = paths[path];
		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as Note;
			const p = { ...metadata } satisfies Note;
			notes.push(p);
		}
	}

	notes = notes.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return { notes };
};
