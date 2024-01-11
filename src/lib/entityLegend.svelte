<script>
  import chroma from "chroma-js";
  import { entities } from "$lib/entities.js";
  import EntityChip from "./entityChip.svelte";
  import OrganicText from "./organicText.svelte";

  export let data;
  export let entityType = "unknown";

  const entity =
    typeof entities[entityType] !== "undefined"
      ? entities[entityType]
      : entities.unknown;

  const entityTypes = [
    "network",
    "collab",
    "org",
    "project",
    "arena",
    "sector",
    "method",
  ];
  let examples = {
    network: {
      label: data?.nets[0]?.name,
      address: "/n/" + data?.nets[0]?.id,
      stewards: "Hive Pollinators",
    },
    collab: {
      label: data?.collabs[0]?.name,
      address: "/c/" + data?.collabs[0]?.id,
      stewards: "",
    },
    org: {
      label: "Philanthropiece",
      address: "/o/recBnsLf96lXiKt89",
      stewards: "",
    },
    project: {
      label: "Farm-to-school St. Vrain Valley",
      address: "#",
      stewards: "",
    },
    method: { label: "Faith-based organizing", address: "#", stewards: "N/A" },
    sector: { label: "Government", address: "#", stewards: "N/A" },
    arena: { label: "Food & Farming", address: "#", stewards: "" },
  };
</script>

<section class="inner">
  <OrganicText tagType="h3" textContent="legend" />
  <table>
    <thead>
      <th>Level </th>
      <th>Example</th>
      <th>Example of "steward"</th>
    </thead>
    <tbody>
      {#each entityTypes as entityType}
        <tr>
          <td>{entities[entityType].label}</td>
          <td
            ><EntityChip
              {entityType}
              address={examples[entityType]?.address}
              label={examples[entityType]?.label}
            /></td
          >
          <td>{examples[entityType].stewards}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    text-align: center;
    padding: 0.5em 1em;
    border: 1px solid black;
  }
</style>
