<script lang="ts">
	import { blur, fade } from 'svelte/transition';

	export let url = 'default';
</script>

{#key url}
	<div
		class="h-full"
		in:blur={{ delay: 500, amount: 4, duration: 500 }}
		out:blur={{ duration: 500, amount: 4 }}
	>
		<slot />
	</div>
{/key}
