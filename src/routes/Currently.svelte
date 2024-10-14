<script lang="ts">
	import type { Book, Song } from '$lib/types';

	export let spotify: Promise<Song>;
	export let literal: Promise<Book>;
</script>

<p>
	<span>Currently listening to </span>
	{#await spotify}
		<span>Loading...</span>
	{:then song}
		<a
			class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm bg-arm/30"
			href={song.link}
			target="_blank">{song.name}</a
		>
		<span> by {song.artist}</span>
	{:catch error}
		<span class="text-red-500">Error: {error.message}</span>
	{/await}

	<span> and slowly reading </span>

	{#await literal}
		<span>Loading...</span>
	{:then book}
		<a
			href={book.link}
			class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm bg-arm/30"
			target="_blank">{book.title}</a
		>
		<span> by {book.author}</span>
	{:catch error}
		<span class="text-red-500">Error: {error.message}</span>
	{/await}
</p>
