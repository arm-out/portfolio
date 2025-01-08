import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	// Define the path to the file in the `static/` directory
	const filePath = `/resume.pdf`;

	// Return a redirect response
	return new Response(null, {
		status: 302,
		headers: {
			Location: filePath // Redirect to the static file
		}
	});
};
