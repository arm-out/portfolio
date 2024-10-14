import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from '$env/static/private';
import type { Book, Song } from '$lib/types';
import type { PageServerLoad } from './$types';

// SSG is disabled for this route
export const prerender = false;

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const client = CLIENT_ID;
const secret = CLIENT_SECRET;
const refresh = REFRESH_TOKEN;

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

async function getNowReading(): Promise<Book> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				title: 'More Than This',
				author: 'Patrick Ness',
				link: 'https://literal.club/armout/book/ness-patrickmore-than-this-97ga4',
				img: 'https://literal.club/assets/images/books/ness-patrickmore-than-this-97ga4.jpg'
			});
		}, 1000);
	});
}

export const load: PageServerLoad = () => {
	const spotify = getNowPlaying();
	const literal = getNowReading();

	return {
		spotify,
		literal
	};
};
