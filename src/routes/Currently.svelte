<script lang="ts">
	export let song: string;
	export let artist: string;
	export let songLink: string;
	let book: string = 'More Than This';
	let author: string = 'Patrick Ness';
	let bookLink: string = 'https://literal.club/armout/book/ness-patrickmore-than-this-97ga4';
</script>

<p>
	Currently listening to <a
		class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm bg-arm/30"
		href={songLink}
		target="_blank">{song}</a
	>
	by {artist}
	and slowly reading
	<a
		href={bookLink}
		class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm bg-arm/30"
		target="_blank">{book}</a
	>
	by {author}
</p>
