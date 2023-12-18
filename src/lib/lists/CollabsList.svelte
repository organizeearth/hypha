<script>
    import ChipList from "./ChipList.svelte";
    import EntityChip from "$lib/entityChip.svelte";
    import OrganicText from "$lib/organicText.svelte";
    export let collabs = [];
  </script>
  
  <OrganicText textContent="Collabs" />
  <ChipList>
    {#each collabs as collab}
      <li>
        <EntityChip
          entityType="project"
          label={collab.name}
          address="/c/{collab.id}"
        />
      </li>
    {/each}
  </ChipList>
  