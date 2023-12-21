<script>
  import OrganicText from "$lib/organicText.svelte";
  import EntityChip from "$lib/entityChip.svelte";
  import "@fontsource/anybody/400.css";
  /** @type {import('./$types').PageData} */
  export let data;

  $: wegotanet = data && typeof data.nets !== "undefined";
  //$: console.log(data);
</script>

<svelte:head>
  <title>Hypha 0</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  {#if wegotanet}
    <OrganicText tagType="h1" textContent="Networks" />
    {#if data.nets.length}
    <ul class="chip-list">
        {#each data.nets as network}
          <li>
            <EntityChip
              address="/n/{network.id}"
              label="{network.name}"
              extra="(3 collabs)"
              entityType="network"
            />
          </li>
        {/each}
      </ul>
    {:else}
      <p>No involved orgs</p>
    {/if}
    {:else}
    <p>No networks!</p>
  {/if}
</section>

<style>
  
</style>
