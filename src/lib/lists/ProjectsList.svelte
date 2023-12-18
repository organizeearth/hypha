<script>
  import ChipList from "./ChipList.svelte";
  import EntityChip from "$lib/entityChip.svelte";
  import OrganicText from "$lib/organicText.svelte";
  export let projects = [];
</script>

<OrganicText textContent="Projects" />
<ChipList>
  {#each projects as project}
    <li>
      <EntityChip
        entityType="project"
        label={project.name}
        address="/p/{project.id}"
      />
    </li>
  {/each}
</ChipList>
