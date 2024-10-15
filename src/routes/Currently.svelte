<script lang="ts">
	import { browser } from '$app/environment';
	import Popover from '$lib/components/Popover.svelte';
	import type { Book, Song } from '$lib/types';
	import { onMount } from 'svelte';

	export let spotify: Promise<Song>;
	export let literal: Promise<Book>;

	let popoverSong: HTMLDivElement;
	let popoverBook: HTMLDivElement;

	let songLink: HTMLAnchorElement;
	let songPos = { top: 0, left: 0 };
	let isHoveringSong = false;
	let songDebounce: NodeJS.Timeout;

	let bookLink: HTMLAnchorElement;
	let bookPos = { top: 0, left: 0 };
	let isHoveringBook = false;
	let bookDebounce: NodeJS.Timeout;

	function updateSongPopover() {
		if (songLink && popoverSong) {
			const linkRect = songLink.getBoundingClientRect();

			songPos = {
				left: -80 + linkRect.width / 2,
				top: linkRect.height
			};
		}
	}

	function updateBookPopover() {
		if (bookLink && popoverBook) {
			const linkRect = bookLink.getBoundingClientRect();

			bookPos = {
				left: -80 + linkRect.width / 2,
				top: linkRect.height
			};
		}
	}

	function showSong() {
		clearTimeout(songDebounce);
		isHoveringSong = true;
	}

	function hideSong() {
		songDebounce = setTimeout(() => {
			isHoveringSong = false;
		}, 300);
	}

	function showBook() {
		clearTimeout(bookDebounce);
		isHoveringBook = true;
	}

	function hideBook() {
		bookDebounce = setTimeout(() => {
			isHoveringBook = false;
		}, 300);
	}

	$: if (songLink && popoverSong) updateSongPopover();
	$: if (bookLink && popoverBook) updateBookPopover();

	let audio: HTMLAudioElement;
	let nowPlaying = false;

	function toggleAudio() {
		if (nowPlaying) {
			audio.pause();
			nowPlaying = false;
		} else {
			audio.play();
			nowPlaying = true;
		}
	}

	let songCover: string;
	let bookCover: string;

	onMount(async () => {
		if (browser) {
			audio = new Audio();
			audio.src = await spotify.then((song) => song.preview);
		}

		songCover = await spotify.then((song) => song.img);
		bookCover = await literal.then((book) => book.img);
	});
</script>

<!-- Preload cover images -->
<svelte:head>
	<link rel="preload" as="image" href={songCover} />
	<link rel="preload" as="image" href={bookCover} />
</svelte:head>

<p>
	<span>Currently listening to </span>
	{#await spotify}
		<span class="animate-pulse w-20 inline-block bg-[#1f1f1f]" aria-hidden="true">&nbsp;</span>
		<span class="sr-only">Loading...</span>
		<span> by </span>
		<span class="animate-pulse w-20 inline-block bg-[#1f1f1f]" aria-hidden="true">&nbsp;</span>
		<span class="sr-only">Loading...</span>
	{:then song}
		<span class="relative">
			<a
				bind:this={songLink}
				class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm bg-arm/30 inline-block"
				href={song.link}
				target="_blank"
				on:mouseenter={showSong}
				on:mouseleave={hideSong}
				>{song.name}
			</a>

			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				bind:this={popoverSong}
				class="absolute inline z-10"
				style="left: {songPos.left}px; top: {songPos.top}px"
				on:mouseenter={showSong}
				on:mouseleave={hideSong}
			>
				{#if isHoveringSong}
					<Popover
						title={song.name}
						by={song.artist}
						img={song.img}
						alt="Album cover of {song.name} by {song.artist}"
					>
						<div class="w-full flex flex-row gap-1 h-full">
							<button
								class="bg-[#1DB954] hover:bg-[#1DB954]/80 transition text-gray-1 py-1 flex items-center justify-center rounded-sm w-1/4 self-stretch"
								on:click={toggleAudio}
							>
								{#if !nowPlaying}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										fill="currentColor"
										viewBox="0 0 256 256"
										class="shrink-0"
										><path
											d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"
										></path></svg
									>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										fill="currentColor"
										viewBox="0 0 256 256"
										class="shrink-0"
										><path
											d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"
										></path></svg
									>
								{/if}
							</button>
							<a
								class="bg-[#202020] hover:bg-[#2f2f2f] text-zinc-100 flex items-center gap-x-1 text-xs justify-center w-full py-1 rounded-sm font-medium transition-colors duration-100 whitespace-nowrap"
								href={song.link}
								target="_blank"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									fill="currentColor"
									viewBox="0 0 256 256"
									class="shrink-0"
									aria-hidden="true"
									><path
										d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm31.07-46.26a8,8,0,0,1-10.81,3.33,42.79,42.79,0,0,0-40.52,0,8,8,0,0,1-7.48-14.14,59.33,59.33,0,0,1,55.48,0A8,8,0,0,1,159.07,169.74Zm32-56a8,8,0,0,1-10.83,3.29,110.62,110.62,0,0,0-104.46,0,8,8,0,0,1-7.54-14.12,126.67,126.67,0,0,1,119.54,0A8,8,0,0,1,191.06,113.76Zm-16,28a8,8,0,0,1-10.82,3.3,77,77,0,0,0-72.48,0,8,8,0,0,1-7.52-14.12,93,93,0,0,1,87.52,0A8,8,0,0,1,175.06,141.76Z"
									></path></svg
								>Listen on Spotify</a
							>
						</div>
					</Popover>
				{/if}
			</div>
		</span>
		<span> by {song.artist}</span>
	{:catch}
		<span>excuses by my spotify endpoint for erroring</span>
	{/await}

	<span> and slowly reading </span>

	{#await literal}
		<span class="animate-pulse w-20 inline-block bg-[#1f1f1f]" aria-hidden="true">&nbsp;</span>
		<span class="sr-only">Loading...</span>
		<span> by </span>
		<span class="animate-pulse w-20 inline-block bg-[#1f1f1f]" aria-hidden="true">&nbsp;</span>
		<span class="sr-only">Loading...</span>
	{:then book}
		<span class="relative">
			<a
				href="https://literal.club/armout/book/{book.slug}"
				class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm bg-arm/30"
				target="_blank"
				on:mouseenter={showBook}
				on:mouseleave={hideBook}>{book.title}</a
			>

			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				bind:this={popoverBook}
				class="absolute inline z-10"
				style="left: {songPos.left}px; top: {songPos.top}px"
				on:mouseenter={showBook}
				on:mouseleave={hideBook}
			>
				{#if isHoveringBook}
					<Popover
						title={book.title}
						by={book.author}
						img={book.img}
						alt="Book cover of {book.title} by {book.author}"
					>
						<a
							class="bg-[#202020] hover:bg-[#2f2f2f] text-zinc-100 flex items-center gap-x-1 text-xs justify-center w-full py-1 rounded-sm font-medium transition-colors duration-100 whitespace-nowrap"
							href="https://literal.club/armout/book/{book.slug}"
							target="_blank"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								fill="currentColor"
								viewBox="0 0 256 256"
								class="shrink-0"
								aria-hidden="true"
								><path
									d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm6.62,31.47,46.82-10.05,3.34,15.9L146,97.53Zm6.64,31.57,46.82-10.06,13.3,63.24-46.82,10.06ZM216,197.94l-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm0,32h48v96H56Zm48,128H56V192h48v16Z"
								></path></svg
							>See on Literal</a
						>
					</Popover>
				{/if}
			</div>
		</span>
		<span> by {book.author}</span>
	{:catch}
		<span>why my book endpoint errored</span>
	{/await}
</p>
