export type Project = {
	title: string;
	slug: string;
	description: string;
	date: string;
	languages: string[];
	code: string;
	live: string;
};

export type Note = {
	title: string;
	slug: string;
	description: string;
	date: string;
};

export type Song = {
	name: string;
	link: string;
	artist: string;
	preview: string;
	img: string;
};

export type Book = {
	slug: string;
	title: string;
	author: string;
	img: string;
};

export interface BookResult {
	slug: string;
	title: string;
	authors: { name: string }[];
	cover: string;
}
