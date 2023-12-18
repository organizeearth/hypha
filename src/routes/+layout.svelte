<script>
	import Header from './Header.svelte';
	import { page } from '$app/stores';
	import './styles.css';

	const debug = !true;
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		{#if debug}
		<button on:click="{() => console.log({data: $page.data })}">Debug</button>
		{/if}
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}


	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
	/*

	footer a {
		font-weight: bold;
	}
	*/
</style>
