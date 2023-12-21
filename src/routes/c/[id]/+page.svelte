<script>
  import OrganicText from "$lib/organicText.svelte";
  import CollabGraph from "$lib/CollabGraph.svelte";
  import EntityChip from "$lib/entityChip.svelte";
  import EntityHeading from "$lib/entityHeading.svelte";
  import EntityLegend from "$lib/entityLegend.svelte";
  import ProjectsList from "$lib/lists/ProjectsList.svelte";
  import "@fontsource/anybody/300.css";
  /** @type {import('./$types').PageData} */
  export let data;
  export let collab = {};

  function groupOrgsWithCollabs(orgs, collabs) {
    return collabs.map(function (c) {
      return {
        ...c,
        orgObjects: orgs.filter((o) => c.orgs.includes(o.id)),
      };
    });
  }

  $: wegotorgs = data && typeof data.orgs !== "undefined";

  $: wegotnets = data && typeof data.nets !== "undefined";
  //$: if (wegotorgs) console.log(data.orgs[0]);
  $: wegotcollabs = data && typeof data.orgs !== "undefined";
  //$: if (wegotcollabs) console.log(data.collabs[0]);
  $: wegotacollaborative = data && typeof data.collab != "undefined";
  $: collab = data?.collab;
  //console.log({data});
  //console.log({collab: data.collab });
  $: wegotcollaborgs =
    !!wegotacollaborative &&
    wegotorgs &&
    data.orgs.length > 0 &&
    data.collab.orgs.length > 0;
  /*
  $: console.log({
    wegotacollaborative,
    wegotorgs,
    orgs: data.orgs.length,
    collaborgs: data.collaborative.orgs.length,
    wegotcollaborgs
  })
  */
  $: collaborgs = wegotcollaborgs
    ? data.orgs.filter((o) => data.collab?.orgs?.includes(o.id))
    : [];

  $: collabsWithOrgs =
    wegotcollabs && wegotorgs
      ? groupOrgsWithCollabs(data.orgs, data.collabs)
      : [];
  //$: console.log(data);
  let activeTab = "about";
  let tabs = ["about", "projects", "orgs", "legend"];
</script>

<svelte:head>
  <title>Hypha 0</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <section>
    <OrganicText tagType="h1" textContent={data.collab.name} />
    <EntityHeading textContent="A Boulder-Area" entityType="collab" />
    {#if wegotcollaborgs}
      <section class="collab-graph-wrapper">
        <CollabGraph {collabsWithOrgs} currentCollab={data.collab.name} />
      </section>
    {/if}
  </section>
  <div class="tab-list-wrapper">
    <nav class="tab-list">
      <ul>
        {#each tabs as tab}
          <li class:active={tab === activeTab}>
            <label>
              <input
                class="nav-radio"
                type="radio"
                bind:group={activeTab}
                name="activeTab"
                value={tab}
              />
              {tab}
            </label>
          </li>
        {/each}
      </ul>
    </nav>
    <div class="spacer" />
  </div>

  <section class="inner" class:hidden={activeTab != "about"}>
    <div class="row">
    <p class="large-text">{data?.collab?.description}</p>
  </div>
  </section>
  <section class="inner" class:hidden={activeTab != "projects"}>
    <ProjectsList projects={data.projects} />
  </section>
  <section class="inner" class:hidden={activeTab != "orgs"}>
    <div class="padded">
      <OrganicText textContent="Involved orgs" />
    </div>
    <section class="chip-list-wrapper">
      <ul class="chip-list">
        {#each collaborgs as org}
          <li>
            <EntityChip
              address="/o/{org.id}"
              label={org.name}
              entityType="org"
            />
          </li>
        {/each}
      </ul>
    </section>
  </section>
  <section class="inner" class:hidden={activeTab != "legend"}>
    <EntityLegend {data} />
  </section>
</main>

<style>
  .large-text {
    font-size: 1.4em;
  }
  .row {
    padding: 0 2em;
  }
</style>
