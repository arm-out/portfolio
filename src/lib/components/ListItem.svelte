<script lang="ts">
	export let p;
	export let i;
	export let external;
	export let changed;
	export let notes = false;

	const delay = changed <= 0 || external ? i * 0.2 : 0.8 + i * 0.2;
</script>

<div style="--delay:{delay}s;" class="fade opacity-0">
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
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.fade {
		animation: fadeIn 0.3s linear;
		animation-delay: var(--delay);
		animation-fill-mode: forwards;
	}
</style>
