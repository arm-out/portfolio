<script lang="ts">
	import { fade } from 'svelte/transition';

	export let img = '';
	export let alt = '';
	export let title = '';
	export let by = '';
</script>

<div
	transition:fade={{ duration: 200 }}
	class="p-1 pb-[6px] w-40 h-fit border bg-[#101010] shadow-sm rounded-[4px] border-[#1f1f1f]"
>
	<div class="aspect-square border shadow-sm rounded-sm border-[#1f1f1f] overflow-hidden">
		<img class="object-cover object-center w-full h-full" src={img} {alt} />
	</div>
	<div class="mt-2 mb-1">
		<span class="text-neutral-50 block truncate leading-none">{title}</span>
		<span class="text-xs text-sec font-normal">by {by}</span>
	</div>
	<slot />
</div>
