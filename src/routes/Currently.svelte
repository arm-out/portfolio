<script lang="ts">
	import type { Book, Song } from '$lib/types';

	export let spotify: Promise<Song>;
	export let literal: Promise<Book>;
</script>

<p>
	<span>Currently listening to </span>
	{#await spotify}
		<span class="animate-pulse w-20 inline-block bg-[#1f1f1f]" aria-hidden="true">&nbsp;</span>
		<span class="sr-only">Loading...</span>
		<span> by </span>
		<span class="animate-pulse w-20 inline-block bg-[#1f1f1f]" aria-hidden="true">&nbsp;</span>
		<span class="sr-only">Loading...</span>
	{:then song}
		<a
			class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm bg-arm/30"
			href={song.link}
			target="_blank">{song.name}</a
		>
		<span> by {song.artist}</span>
	{:catch}
		<span class="text-red-500">excuses by my spotify endpoint for erroring</span>
	{/await}

	<span> and slowly reading </span>

	{#await literal}
		<span class="animate-pulse w-20 inline-block bg-[#1f1f1f]" aria-hidden="true">&nbsp;</span>
		<span class="sr-only">Loading...</span>
		<span> by </span>
		<span class="animate-pulse w-20 inline-block bg-[#1f1f1f]" aria-hidden="true">&nbsp;</span>
		<span class="sr-only">Loading...</span>
	{:then book}
		<a
			href={book.link}
			class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm bg-arm/30"
			target="_blank">{book.title}</a
		>
		<span> by {book.author}</span>
	{:catch}
		<span>why my book endpoint errored</span>
	{/await}
</p>
