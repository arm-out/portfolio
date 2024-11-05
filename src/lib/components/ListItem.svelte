<script lang="ts">
	export let p;
	export let notes = false;
</script>

<div class="mb-6 hover:bg-sec/5 {notes && 'flex flex-row'}">
	{#if notes}
		<time datetime={p.date} class="text-sec w-20 font-light">{p.date}</time>
	{/if}
	<a href="/{notes ? 'notes' : 'projects'}/{p.slug}" data-sveltekit-noscroll>
		<div class="flex flex-row gap-3 pb-1">
			<h3 class="inline-block underline decoration-arm decoration-1 underline-offset-[3px]">
				{p.title}
			</h3>
			{#if p.languages}
				<span class="text-sec font-light italic">{p.languages.join(', ')}</span>
			{/if}
		</div>
		<p class="text-sec">{p.description}</p>
	</a>
</div>
