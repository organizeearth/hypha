<script>
  import { activeMethod, activeSector, activeArena } from "./stores";
  import EntityHeading from "$lib/entityHeading.svelte";
  import Map from "$lib/mapbox/Map.svelte";
  import Radio from "$lib/Radio.svelte";
  import Button from "$lib/Button.svelte";
  import CollabRadar from "$lib/dash/radar/collabRadar.svelte";
  import OrganicText from "$lib/organicText.svelte";

  /** @type string */
  let activeMethod_value;
  activeMethod.subscribe((value) => {
    activeMethod_value = value;
  });

  /** @type string */
  let activeSector_value;
  activeSector.subscribe((value) => {
    activeSector_value = value;
  });

  /** @type string */
  let activeArena_value;
  activeArena.subscribe((value) => {
    activeArena_value = value;
  });

  import {
    isFilteredIn,
    hasLatLng,
    translateToMarker,
    defaultFilterMethod,
    filterOptions as networkOptions,
    getMethodsWithOrgCounts,
  } from "$lib/dash/dashUtils";

  /** @type {import('./$types').PageData} */
  export let data;

  const calendarText = "Upcoming events";
  const calendarUrl = "https://boulder.earth/calendar/";
  const bulletinText = "Take action now";
  const bulletinUrl = "https://boulder.earth/actions-for-impact/";

  let activeYear = 2023;
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
  const setActiveYear = (year) => {
    activeYear = year;
  };
  $: wegotorgs = data && typeof data.orgs !== "undefined";
  $: wegotacollaborative = data && typeof data.collab != "undefined";
  $: wegotcollaborgs =
    !!wegotacollaborative &&
    wegotorgs &&
    data.orgs.length > 0 &&
    data?.collab?.orgs?.length > 0;
  $: collaborgs = wegotcollaborgs
    ? data.orgs.filter((o) => data.collab?.orgs?.includes(o.id))
    : [];

  $: orgs = wegotorgs
    ? networkSelected == "collab"
      ? collaborgs
      : data.orgs
    : [];

  let activeOrgId;

  let networkSelected = defaultFilterMethod;
  /** @type {string} */
  let selectedArena;
  /** @type {string} */
  let selectedSector;
  /** @type {string} */
  let selectedMethod;

  $: filters = {
    arena: selectedArena,
    sector: selectedSector,
    method: activeSector_value,
  };

  function filterChange() {
    //console.log("Change!");
    filters = filters;
    orgs = orgs;
    filteredOrgs = filteredOrgs;
    filteredMarkers = filteredMarkers;
    //console.log({ filters, orgs, filteredOrgs, filteredMarkers });
  }

  $: filteredOrgs = orgs.filter((o) => isFilteredIn(o, activeArena_value, activeMethod_value, activeSector_value));
  $: filteredMarkers = filteredOrgs
    .filter((o) => hasLatLng(o))
    .map((o) => translateToMarker(o));

  $: methods = getMethodsWithOrgCounts(data.methods, filteredOrgs);
  $: rankedMethods = methods
    .sort((a, b) => {
      //console.log({a, b});
      if (a.orgCount < b.orgCount) return 1;
      if (b.orgCount < a.orgCount) return -1;
      return 0;
    })
    .filter((m) => m.orgCount > 0);

  const trim = (text, max) => {
    if (text.length <= max) {
      return text;
    }
    return text.substring(0, max) + "...";
  };

  const handleMethodChipClick = (method) => {
    if (method.id === selectedMethod) {
      selectedMethod = "ANY";
    } else {
      selectedMethod = method.id;
    }
  };

  function handleActivate(event) {
    //console.log({ id2: event.detail.id });
    activeOrgId = event.detail.id;
  }
  function handleActivateForce(event) {
    //console.log({ id3: event.detail.id });
    //console.log({ rankedMethods, selectedMethod });
    let marker = document.getElementById(event.detail.id);
    //console.log({ marker });
    if (marker) {
      marker.click();
    }
  }
</script>

<svelte:head>
  <title>Hypha Blueprint</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <section class="dash-head">
    <div class="dash-head-item">
      <OrganicText tagType="h1" textContent="Test: Dashboard" />

      <EntityHeading textContent={data?.collab?.name} entityType="collab" />
      <div class="image-placeholder">
        <p>
          {data?.collab?.description}
        </p>
      </div>
    </div>
    <div class="options-wrapper">
      <div class="dash-head-item">
        <label
          >Arena
          <select bind:value={activeArena_value} on:change={() => filterChange()}>
            <option selected value="ANY"> Any</option>
            {#each data.arenas as arena}
              <option value={arena.id}>{arena?.name}</option>
            {/each}
          </select>
        </label>
      </div>
      <div class="dash-head-item">
        <label
          >Sector
          <select bind:value={activeSector_value} on:change={() => filterChange()}>
            <option selected value="ANY"> Any</option>
            {#each data.sector as sector}
              <option value={sector.id}>{sector?.name}</option>
            {/each}
          </select>
        </label>
      </div>
      <div class="dash-head-item">
        <label
          >Method
          <select bind:value={activeMethod_value} on:change={() => filterChange()}>
            <option selected value="ANY"> Any</option>
            {#each data.methods as method}
              <option value={method.id}>{method?.name}</option>
            {/each}
          </select>
        </label>
        <!--
        <br><br><br>
        <label
          >Proximity
          <select bind:value={activeMethod_value} on:change={() => filterChange()}>
            <option selected value="ANY"> Any</option>
            {#each data.methods as method}
              <option value={method.id}>{method.name}</option>
            {/each}
          </select>
        </label>
        -->
      </div>
      <div class="dash-head-item">
        <Radio
          options={networkOptions}
          legend="Test: Network organizations"
          bind:userSelected={networkSelected}
        />
        <p>{filteredOrgs.length} matching orgs</p>
      </div>
    </div>
  </section>

  <div class="row-of-two">
    <CollabRadar filteredOrgs activeOrgId selectedMethod></CollabRadar>
    <section>
      <OrganicText tagType="h1" textContent="Map (Where?)" />
      <Map
        orgs={filteredMarkers}
        collabs={data.collabs}
        arenas={data.arenas}
        {activeOrgId}
        on:activate={handleActivate}
      />
    </section>
  </div>

  <div class="row-of-two">
    <section>
      <table>
        <th>Name</th>
        <th>Sector</th>
        <th>Colorcategory</th>
        <th>Color</th>
        {#each filteredMarkers as marker}
          <tr>
            <td>{marker?.name}</td>
            <td>{marker?.sector.length}</td>
            <td>{marker?.colorcategory}</td>
            <td
              style="color: white; font-weight: bold; background: {marker?.marker
                ?.color};">{marker?.marker?.color}</td
            >
          </tr>
        {/each}
      </table>
    </section>
  </div>
  <div class="row-of-two">
    <section>
      <table>
        <th>Name</th>
        <th>Sector</th>
        <th>Colorcategory</th>
        <th>Color</th>
        {#each filteredOrgs as org}
          <tr on:click="{() => console.log(org)}">
            <td>{org?.name}</td>
            <td>{org?.sector.length}</td>
            <td>{org?.colorcategory}</td>
            <td
              style="color: white; font-weight: bold; background: {org?.color};"
              >{org?.color}</td
            >
          </tr>
        {/each}
      </table>
    </section>
  </div>
  <div class="row-of-two">
    <section>
      <table>
        <th>Name</th>
        <th>Sector</th>
        <th>Colorcategory</th>
        <th>Color</th>
        {#each orgs as org}
          <tr>
            <td>{org?.name}</td>
            <td>{org?.sector.length}</td>
            <td>{org?.colorcategory}</td>
            <td
              style="color: white; font-weight: bold; background: {org?.color};"
              >{org?.color}</td
            >
          </tr>
        {/each}
      </table>
    </section>
  </div>

  <!--
  <div class="row-of-two">
    <section>
      <OrganicText tagType="h1" textContent="Skillsets (How?)" />
      <ul class="method-list">
        {#each rankedMethods as method}
          <li
            class:active={method.id === selectedMethod}
            on:click={() => handleMethodChipClick(method)}
          >
            <span class="name">{trim(method.name, 20)}</span><span class="count"
              >{method.orgCount}</span
            >
          </li>
        {/each}
      </ul>
    </section>
    <section>
      <OrganicText tagType="h1" textContent="Resource Library (Why?)" />
      <OrganicText
        tagType="h1"
        textContent="(coming soon)"
        color="rgba(15, 0, 127, 0.5)"
      />
      <p>Browse learning resources by topic at Boulder.Earth</p>
      <Button
        text="View example topic"
        link="https://boulder.earth/cmap/circular-economy/"
        external={true}
      />
    </section>
  </div>
  <div class="row-of-two">
    <section>
      <OrganicText tagType="h1" textContent="Bulletin board" />
      <OrganicText
        tagType="h1"
        textContent="(coming soon)"
        color="rgba(15, 0, 127, 0.5)"
      />
      <p>View timely resources and ways to take action at Boulder.Earth</p>
      <Button text={bulletinText} link={bulletinUrl} external={true} />
    </section>
    <section class="timeline">
      <OrganicText tagType="h1" textContent="Collective Timeline (When?)" />
      <img src="/year-wheel-bg.png" />
      <h3>{activeYear}</h3>
      <div class="yearnav">
        {#each years as year}
          <a class="year" on:click={() => setActiveYear(year)}>
            {"'" + (year - 2000)}
          </a>
        {/each}
      </div>
      <Button text={calendarText} link={calendarUrl} external={true} />
    </section>
  </div>-->
</main>

<style>
  .dash-head {
    display: flex;
    flex-direction: row;
  }
  .dash-head p {
    font-size: 0.9em;
  }
  .dash-head-item {
    padding: 1em;
    flex: 1;
  }
  select {
    max-width: 120px;
    background: transparent;
  }
  .row-of-two {
    display: flex;
    flex-direction: row;
    border: 2px dotted var(--color-theme-1);
    border-bottom: none;
  }
  .row-of-two:last-child {
    border-bottom: 2px dotted var(--color-theme-1);
  }
  .row-of-two section {
    border: none;
  }
  .row-of-two section:first-child {
    border-right: 2px dotted var(--color-theme-1);
  }
  .row-of-two .container section {
    border-right: none;
  }
  .options-wrapper {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  section p {
    margin: 2em;
  }
  /*
  .method-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto auto auto auto;
    grid-auto-flow: column;
    gap: 0.5em;
    margin: 0 1em 2em;
  }
  .method-list li {
    list-style-type: none;
    display: flex;
    padding: 0.25em 0.5em;
    border-radius: 1em;
    border: 1px solid var(--color-theme-1);
    color: black;
    font-weight: bold;
    cursor: pointer;
  }
  .method-list li.active {
    border-width: 3px;
  }
  .method-list li span {
    flex: 4;
  }
  .method-list li span.name {
    font-size: 14px;
    align-self: center;
  }
  .method-list li span.count {
    flex: 1;
    text-align: center;
    align-self: center;
  }
  .timeline h3 {
    margin-top: -275px;
    margin-bottom: 275px;
    font-size: 3em;
  }
  .yearnav {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
  }
  .year {
    flex: 1;
    border: 1px solid black;
    border-radius: 50%;
    margin: 0.25em;
    padding: 0.75em;
  }
  .year:hover {
    text-decoration: none;
    cursor: pointer;
  }*/
</style>
