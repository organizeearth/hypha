<script>
  import ColorSwatch from "$lib/ColorSwatch.svelte";
  import OrganicText from "$lib/organicText.svelte";
  import CollabRadarDiagram from "./collabRadarDiagram.svelte";

  import { colorLegend } from "$lib/dash/dashUtils";
  import SwatchContrast from "../SwatchContrast.svelte";

  let proximityLegend = [
    { label: "Frontline", id: 1, value: "frontline" },
    { label: "Solidarity", id: 2, value: "solidarity"},
    { label: "Support", id: 3, value: "support" },
  ];

  export let filteredOrgs = [];
  $: renderedDots = filteredOrgs;
  //console.log({renderedDots});
  export let activeOrgId;
  export let paneTitle = "Solidarity Radar";
</script>

<section>
  <div class="row">
    <OrganicText tagType="h1" textContent={paneTitle} />
  </div>
  <div class="row full-width">
    <CollabRadarDiagram {renderedDots} {activeOrgId} />
  </div>
  <div class="row">
    <div class="col">
      <h5>Impact<br>Proximity</h5>
      <div class="row">
        <div class="col" />
        <div class="col">
          <ul class="contrast-legend">
            {#each proximityLegend as { id, label, value }}
              <SwatchContrast {id} {label} {value} />
            {/each}
          </ul>
        </div>
      </div>
    </div>
    <div class="col">
      <h5>Sector</h5>
      <ul class="color-legend">
        {#each colorLegend as { color, label, sector }}
          <ColorSwatch {color} {label} {sector} />
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .full-width {
    width: 100%;
  }
  .col {
  }
  h5 {
    text-align: center;
    text-transform: uppercase;
  }
  .contrast-legend {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-auto-flow: column;
    gap: 1em;
    margin: 0 1em 0 0;
  }
  .color-legend {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-auto-flow: column;
    gap: 1em;
  }
</style>
