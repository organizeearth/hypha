<script>
  import OrganicText from "$lib/organicText.svelte";
  import logo from "$lib/images/svelte-logo.svg";
  import github from "$lib/images/github.svg";
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  const dashboardId = "recGRgd9dx5YTov2E";
  const dashboardUrl = `/dashboard/${dashboardId}.html`;

  let currentPath = $page.url.pathname;
</script>

<header>
  <div class="corner">
    <a href="/">
      <OrganicText textContent="Grassroots Alliance" />
    </a>
  </div>

  <div class="corner">
    {#if currentPath !== dashboardUrl || $page.url.pathname !== dashboardUrl}
      <a href={dashboardUrl} data-sveltekit-reload data-sveltekit-preload-data>Log into dash</a>
    {:else}
      <a href="/" data-sveltekit-reload data-sveltekit-preload-data>Log out</a>
    {/if}
  </div>
</header>

<style>
  a:hover {
    color: var(--color-theme-1);
  }

  header {
    display: flex;
    justify-content: space-between;
    background: rgba(113, 88, 255, 0.1);
    border-bottom: 2px dotted var(--color-theme-1);
  }

  .corner {
    height: 3em;
    padding: 0 1em;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>
