import {
	LITERAL_USER_EMAIL,
	LITERAL_USER_PASSWORD,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';
import type { Book, BookResult, Song } from '$lib/types';
import type { PageServerLoad } from './$types';

// SSG is disabled for this route
export const prerender = false;

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const client = SPOTIFY_CLIENT_ID;
const secret = SPOTIFY_CLIENT_SECRET;
const refresh = SPOTIFY_REFRESH_TOKEN;

async function getAccessToken(client_id: string, client_secret: string, refresh_token: string) {
	//Creates a base64 code of client_id:client_secret as required by the API
	const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

	//The response will contain the access token
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token
		})
	});

	return response.json();
}

async function getNowPlaying(): Promise<Song> {
	try {
		//Generating an access token
		const { access_token } = await getAccessToken(client, secret, refresh);

		//Fetching the response
		const response = await fetch(NOW_PLAYING_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});

		//If response status > 400 means there was some error while fetching the required information
		if (response.status > 400) {
			throw new Error('Unable to Fetch Song');
		} else if (response.status === 204) {
			//The response was fetched but there was no content
			throw new Error('Currently Not Playing');
		}

		//Extracting the required data from the response into seperate variables
		let song = await response.json();
		song = song.items[0];
		// console.log(song);

		const name = song.track.name;
		const link = song.track.external_urls.spotify;
		const artist = song.track.album.artists[0].name;
		const preview = song.track.preview_url;
		const img = song.track.album.images[0].url;

		//Returning the song details
		return {
			name,
			link,
			artist,
			preview,
			img
		};
	} catch (error) {
		console.error('Error fetching currently playing song: ', error);
		throw new Error('Error fetching song');
	}
}

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

async function getNowReading(): Promise<Book> {
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

	return latestBook;
}

export const load: PageServerLoad = () => {
	const spotify = getNowPlaying();
	const literal = getNowReading();

	return {
		spotify,
		literal
	};
};
