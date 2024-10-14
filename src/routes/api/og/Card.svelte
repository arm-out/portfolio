<script lang="ts">
	export let title = '';
	export let desc = '';
	export let origin = '';
</script>

<div
	style:display="flex"
	style:flex-direction="column"
	style:justify-content="center"
	style:align-items="flex-end"
	style:height="100%"
	style:width="100%"
	style:padding="2rem"
	style:position="relative"
	style:background-image="url({origin}/og-bg.png)"
>
	<!-- svelte-ignore a11y-missing-attribute -->
	<p style:color="#f8fafc" style:font-size="4.5rem" style:line-height="1" class="text-">
		{title}
	</p>
	<p style:color="#626262" style:font-size="2.25rem" style:line-height="2.5rem">{desc}</p>
</div>
