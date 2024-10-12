<script lang="ts">
	import { blur, fade } from 'svelte/transition';

	export let url = 'default';
</script>

{#key url}
	<div class="h-full" in:blur={{ delay: 400 }} out:blur>
		<slot />
	</div>
{/key}
