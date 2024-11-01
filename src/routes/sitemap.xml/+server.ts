import type { Note, Project } from '$lib/types.js';

export const prerender = true;

export async function GET({ setHeaders }) {
	setHeaders({ 'Content-Type': 'application/xml' });

	const projectPaths = await import.meta.glob('/src/projects/*.md', { eager: true });
	const notePaths = await import.meta.glob('/src/notes/*.md', { eager: true });

	const projects = [];
	const notes = [];

	for (const path in projectPaths) {
		if (path === '/src/projects/_template.md') continue;

		const file = projectPaths[path];
		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as Project;
			projects.push(metadata);
		}
	}

	for (const path in notePaths) {
		if (path === '/src/notes/_template.md') continue;

		const file = notePaths[path];
		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as Note;
			notes.push(metadata);
		}
	}

	console.log(projects);
	console.log(notes);

	const projectEntries = projects.map((project) =>
		createEntry(`projects/${project.slug}`, project.date)
	);

	const noteEntries = notes.map((note) => createEntry(`notes/${note.slug}`, note.date));

	const xml = `
        <?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			${createEntry('', '')}
            ${projectEntries.join('\n')}
            ${noteEntries.join('\n')}
            ${createEntry('about', '')}
	    </urlset>`.trim();

	return new Response(xml);
}

function createEntry(path: string, lastmod: string): string {
	return `
    <url>
        <loc>https://arminsuraj.com/${path}</loc>
        ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : new Date().toISOString()}
    </url>
    `;
}
