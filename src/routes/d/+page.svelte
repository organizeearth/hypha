<script>
  import EntityChip from "$lib/entityChip.svelte";
  /** @type {import('./$types').PageData} */
  export let data;

  $: collabs = data && typeof data.collabs !== "undefined" ? data.collabs : [];
</script>

<main>
  {#each collabs as collab}
    <EntityChip
      address="/c/{collab.id}"
      label={collab.name}
      entityType="collab"
    />
  {/each}
</main>

<style>
</style>
