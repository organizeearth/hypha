<script>
  import Map from "../../../lib/mapbox/Map.svelte";
  import OrganicText from "$lib/organicText.svelte";
  import {
    isFilteredIn,
    hasLatLng,
    translateToMarker,
    defaultFilterMethod,
    filterOptions,
  } from "$lib/dash/dashUtils";
  import { filterRefs } from "$lib/dataUtils";
  export let data = {};
  export let org = {};
  //console.log({ org });
  $: filteredMarkers = [org]
    .filter((o) => hasLatLng(o))
    .map((o) => translateToMarker(o));

  $: arenas = filterRefs(data?.arenas, org.arenas);
  $: sector = filterRefs(data?.sector, org.sector);
  $: methods = filterRefs(data?.methods, org.methods);
  $: activeOrgId = org?.id;

  function handleActivate(event) {
    //console.log({ id2: event.detail.id });
    activeOrgId = event.detail.id;
  }

  //console.log({ arenas, methods, sectors });
  //data?.arenas?.length ? data?.arenas.filter((a) => org.arenas.includes(a.id)) : [];
  //$: sectors = data?.sectors.filter((a) => org.sectors.includes(a.id)) : [];
  //$: methods = data?.methods.filter((a) => org.methods.includes(a.id)) : [];
</script>

<div class="about-org">
  <div class="row hr-bottom">
    <div class="col">
      <p class="large-text">{org?.description}</p>
      <div class="button-wrap">
        <a class="button-link" href="{org?.website}">Visit website</a>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col left-col">
      <OrganicText tagType="h1" textContent="Arenas (What?)" />
      <section>
        <ul>
          {#each arenas as arena}
            <li>{arena.name}</li>
          {/each}
        </ul>
      </section>

      <OrganicText tagType="h1" textContent="Methods (How?)" />
      <section>
        <ul>
          {#each methods as method}
            <li>{method.name}</li>
          {/each}
        </ul>
      </section>

      <OrganicText tagType="h1" textContent="Sector" />
      <section>
        <ul>
          {#each sector as sector}
            <li>{sector.name}</li>
          {/each}
        </ul>
      </section>
    </div>
    <div class="col right-col">
      <OrganicText tagType="h1" textContent="Map (Where?)" />
      <section class="map-wrapper">
          <Map
          orgs={filteredMarkers}
          collabs={data.collabs}
          arenas={data.arenas}
          {activeOrgId}
          on:activate={handleActivate}
        />
      </section>
    </div>
  </div>
</div>

<style>
  .button-link {
    background: rgba(191, 99, 13, 0.2);
    display: inline;
    margin-left: 0.5em;
    padding: 1em 1em 0.75em;
    border-radius: 5px;
    color: rgb(138, 72, 10);
    font-weight: 400;
    font-family: "Anybody", sans-serif;
  }
  .button-wrap {
    margin-bottom: 1em;
    padding: 1em;
  }
  .large-text {
    font-size: 1.4em;
    font-weight: 100n;
  }
  .row {
    padding: 0 2em;
  }
  .map-wrapper {
    height: 400px;
  }
  .row {
    display: flex;
  }
  .col {
    flex: 1;
  }
  li {
    list-style-type: none;
  }
  .hr-bottom {
    padding-bottom: 1em;
    border-bottom: 2px dotted var(--color-theme-1);
  }
</style>
