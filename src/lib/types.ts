export type Project = {
	title: string;
	slug: string;
	description: string;
	date: string;
	languages: string[];
	code: string;
	live: string;
};

export type Song = {
	name: string;
	link: string;
	artist: string;
	preview: string;
	img: string;
};

export type Book = {
	title: string;
	author: string;
	link: string;
	img: string;
};
