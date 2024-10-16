import { LITERAL_USER_EMAIL, LITERAL_USER_PASSWORD } from '$env/static/private';
import type { Book, BookResult } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

const LITERAL_ENDPOINT = 'https://literal.club/graphql/';

async function getLiteralAccessToken() {
	const response = await fetch(LITERAL_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: `
              mutation login($email: String!, $password: String!) {
                  login(email: $email, password: $password) {
                      token
                  }
              }
          `,
			variables: {
				email: LITERAL_USER_EMAIL,
				password: LITERAL_USER_PASSWORD
			}
		})
	}).then((res) => res.json());
	return response.data.login.token;
}

export const GET: RequestHandler = async () => {
	const access_token = await getLiteralAccessToken();

	const response = await fetch(LITERAL_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${access_token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: `
          query myReadingStates {
            myReadingStates {
              ...ReadingStateParts # find fragments below
              book {
                ...BookParts # find fragments below
              }
            }
          }

          fragment ReadingStateParts on ReadingState {
            id
            status
            bookId
            profileId
            createdAt
          }

          fragment BookParts on Book {
            id
            slug
            title
            subtitle
            description
            cover
            authors {
              id
              name
            }
          }
            `
		})
	});

	if (!response.ok) throw new Error('Something went wrong');

	const { data } = await response.json();

	const latestBook = data.myReadingStates
		.filter((shelf: { status: string; book: BookResult }) => shelf.status === 'IS_READING')
		.slice(-1)
		.map(({ book }: { book: BookResult }) => ({
			title: book.title,
			author: book.authors[0].name,
			img: book.cover,
			slug: book.slug
		}))[0];

	// set cache control to 1 hour
	return new Response(JSON.stringify(latestBook as Book), {
		status: 200,
		headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=86400' }
	});
};
