<script>
  import {
    activeMethod,
    activeSector,
    activeArena,
    activeProximity,
    activeInvolvement,
    activeOrgId,
  } from "./stores";
  import EntityHeading from "$lib/entityHeading.svelte";
  import Map from "./Map.svelte";
  import Radio from "$lib/Radio.svelte";
  import Button from "$lib/Button.svelte";
  import CollabRadar from "$lib/dash/radar/collabRadar.svelte";
  import OrganicText from "$lib/organicText.svelte";
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";
  onMount(() => {
    const interval = setInterval(() => {
      invalidateAll();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

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

  /** @type string */
  let activeProximity_value;
  activeProximity.subscribe((value) => {
    activeProximity_value = value;
  });

  /** @type string */
  let activeInvolvement_value;
  activeInvolvement.subscribe((value) => {
    activeInvolvement_value = value;
  });

  /** @type string */
  let activeOrgId_value;
  activeOrgId.subscribe((value) => {
    activeOrgId_value = value;
  });

  import {
    isFilteredIn,
    hasLatLng,
    translateToMarker,
    proximityOptions,
    involvementOptions,
    getMethodsWithOrgCounts,
    getArenasWithOrgCounts,
    loadOrgsForDash,
    sectorToLabel,
  } from "$lib/dash/dashUtils";

  /** @type {import('./$types').PageData} */
  export let data;

  const calendarText = "Upcoming events";
  const calendarUrl = "https://boulder.earth/calendar/";
  const bulletinText = "Take action now";
  const bulletinUrl = "https://boulder.earth/actions-for-impact/";

  let activeYear = 2024;
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const setActiveYear = (year) => {
    activeYear = year;
  };
  $: wegotorgs = data && typeof data.orgs !== "undefined";
  $: wegotacollaborative = data && typeof data.collab !== "undefined";
  $: collab = wegotacollaborative ? data?.collab : { id: false };
  $: wegotcollaborgs =
    !!wegotacollaborative &&
    wegotorgs &&
    data.orgs.length > 0 &&
    data?.collab?.orgs?.length > 0;

  $: collaborgs = wegotcollaborgs
    ? data.orgs.filter((o) => data.collab?.orgs?.includes(o.id))
    : [];

  $: orgs =
    activeInvolvement_value === "active"
      ? loadOrgsForDash(collaborgs, collab)
      : loadOrgsForDash(data.orgs, collab);

  $: filters = {
    arena: activeArena_value,
    sector: activeSector_value,
    method: activeMethod_value,
    proximity: activeProximity_value,
    involvement: activeInvolvement_value,
  };

  function filterChange() {
    //console.log("Change!");
    invalidateAll();
    filters = filters;
    orgs = orgs;
    filteredOrgs = filteredOrgs;
    filteredMarkers = filteredMarkers;
    invalidateAll();
    //console.log({ filters, orgs, filteredOrgs, filteredMarkers });
  }

  const trim = (text, max) => {
    if (text.length <= max) {
      return text;
    }
    return text.substring(0, max) + "...";
  };

  const handleMethodChipClick = (method) => {
    if (method.id === activeMethod_value) {
      activeMethod.set("ANY");
    } else {
      activeMethod.set(method.id);
    }
  };

  const handleArenaChipClick = (arena) => {
    if (arena.id === activeArena_value) {
      activeArena.set("ANY");
    } else {
      activeArena.set(arena.id);
    }
  };

  $: filteredOrgs = orgs.filter((o) => {
    filters = filters;
    return isFilteredIn(o, filters);
  });

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

  $: arenas = getArenasWithOrgCounts(data.arenas, filteredOrgs);
  $: rankedArenas = arenas
    .sort((a, b) => {
      //console.log({a, b});
      if (a.orgCount < b.orgCount) return 1;
      if (b.orgCount < a.orgCount) return -1;
      return 0;
    })
    .filter((m) => m.orgCount > 0);

  function handleActivate(event) {
    //console.log({ id2: event.detail.id });
    activeOrgId.set(event.detail.id);
    invalidateAll();
  }

  let debugDrawerEnabled = true;
  const toggleDebugDrawer = () => {
    debugDrawerEnabled = !debugDrawerEnabled;
    invalidateAll();
  };
  $: debugClass = debugDrawerEnabled ? "hidden" : "";
  $: whoToggleLabel = debugDrawerEnabled ? "View List of Displayed Organizations" : "Hide List of Displayed Organizations";

</script>

<main>
  <section class="dash-head">
    <div class="dash-head-item">
      <OrganicText tagType="h1" textContent="Dashboard" />

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
          <select
            bind:value={activeArena_value}
            on:change={() => filterChange()}
          >
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
          <select
            bind:value={activeSector_value}
            on:change={() => filterChange()}
          >
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
          <select
            bind:value={activeMethod_value}
            on:change={() => filterChange()}
          >
            <option selected value="ANY"> Any</option>
            {#each data.methods as method}
              <option value={method.id}>{method?.name}</option>
            {/each}
          </select>
        </label>
        <br /><br /><br />
        <label
          >Proximity
          <select
            bind:value={activeProximity_value}
            on:change={() => filterChange()}
          >
            {#each proximityOptions as { shortLabel, value }}
              <option {value}>{shortLabel}</option>
            {/each}
          </select>
        </label>
      </div>
      <div class="dash-head-item">
        <Radio
          options={involvementOptions}
          legend="Network organizations"
          on:change={() => filterChange()}
          bind:userSelected={activeInvolvement_value}
        />
        <br />
        <p>{filteredOrgs.length} on radar</p>
        <p>{filteredMarkers.length} on map</p>
      </div>
    </div>
  </section>

  <div class="row-of-two">
    <section>
      <OrganicText tagType="h1" textContent="Positionality Directory" />
      <button class="debug-tggle" on:click={() => toggleDebugDrawer()}
        >{whoToggleLabel}</button
      >
      <table class={"debug-drawer " + debugClass}>
        <th>Organization Name</th>
        <th>Sector</th>
        <th>Proximity</th>
        <th>Involvement</th>
        {#each filteredOrgs as org}
          <tr>
            <td><a href={"/o/" + org.id}>{org?.name}</a></td>
            <td
              style="color: white; font-weight: bold; background: {org?.color};"
              >{sectorToLabel(org.sector)}</td
            >
            <td>{org?.proximity}</td>
            <td>{org?.involvement}</td>
          </tr>
        {/each}
      </table>
      <br>
    </section>
  </div>

  <div class="row-of-two">
    <CollabRadar {filteredOrgs} {activeOrgId}></CollabRadar>
    <section>
      <OrganicText tagType="h1" textContent="Impact Map" />
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
      <OrganicText tagType="h1" textContent="Arena Efforts" />
      <ul class="method-list">
        {#each rankedArenas as arena}
          <li
            class:active={arena.id === activeArena_value}
            on:click={() => handleArenaChipClick(arena)}
          >
            <span class="name">{trim(arena.name, 20)}</span><span class="count"
              >{arena.orgCount}</span
            >
          </li>
        {/each}
      </ul>
    </section>
    <section>
      <OrganicText tagType="h1" textContent="Skill Sets" />
      <ul class="method-list">
        {#each rankedMethods as method}
          <li
            class:active={method.id === activeMethod_value}
            on:click={() => handleMethodChipClick(method)}
          >
            <span class="name">{trim(method.name, 20)}</span><span class="count"
              >{method.orgCount}</span
            >
          </li>
        {/each}
      </ul>
    </section>
  </div>

  <div class="row-of-two">
    <section>
      <OrganicText tagType="h1" textContent="Fundamentals" />
      <OrganicText
        tagType="h1"
        textContent="Guiding Principles"
        color="rgba(15, 0, 127, 0.5)"
      />
      <p>1) Prioritize a Climate Justice lens<br>
      2) Commitment to Collaboration<br>
      3) Resource Sharing<br>
      4) Community Engagement<br>
      5) Long-Term Planning<br>
      6) Continuous Learning</p>
      <OrganicText
        tagType="h1"
        textContent="Problem Statements"
        color="rgba(15, 0, 127, 0.5)"
      />
      <p>[Insert problem statement for this collaboration]</p>
      <OrganicText
        tagType="h1"
        textContent="Resource Library"
        color="rgba(15, 0, 127, 0.5)"
      />
      <Button
        text="Browse"
        link="https://www.zotero.org/groups/5346947/boco_cj_hive/library"
        external={true}
      />
    </section>
    <section class="timeline">
      <OrganicText tagType="h1" textContent="Benchmarks" />
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
  </div>

  -->
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

  .row-of-two section:first-child {
    border-right: 2px dotted var(--color-theme-1);
  }
  .row-of-two section {
    border: none;
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
  section .dash-head-item p {
    margin: 0;
  }

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
  }
  .debug-drawer-wrapper {
    display: inline; /* @TODO: Hide by changing to `display: none`*/
  }
  .debug-drawer {
    width: 100%;
  }
  .hidden {
    display: none;
  }
  .debug-toggle {
    margin-top: -1em;
  }
</style>
