<script>
  import OrganicText from "$lib/organicText.svelte";
  import EntityHeading from "$lib/entityHeading.svelte";
  import EntityChip from "$lib/entityChip.svelte";
  import EntityLegend from "$lib/entityLegend.svelte";
  import ProjectsList from "$lib/lists/ProjectsList.svelte";
  import AboutOrg from "./AboutOrg.svelte";
  import OrgLogo from "../../OrgLogo.svelte";
  import BaseballCard from "$lib/BaseballCard.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  $: org = data?.org || {};

  console.log({ data });
  //$: if (wegotorgs) console.log(data.orgs[0]);
  $: wegotcollabs = data && typeof data.collabs !== "undefined";
  $: wegotnets = data && typeof data.nets !== "undefined";
  //$: if (wegotcollabs) console.log(data.collabs[0]);
  $: wegotanorg = data && typeof data.org != "undefined";
  $: wegotorgcollabs =
    wegotanorg &&
    wegotcollabs &&
    data.org?.collabs?.length &&
    data.collabs.length;

  if (!data?.org?.lat) data.org.lat = 40.0157514;
  if (!data?.org?.lng) data.org.lng = -105.2612955;

  const filterCollabs = (data) => {
    return [];
    if (!data.collabs || !data.collabs.length) {
      return [];
    }
    if (!data.org || !data.org.collabs || !data.org.collabs.length) {
      return [];
    }
    if (!Array.isArray(data.org.collabs)) {
      return [];
    }
    return data.collabs.filter((c) => data?.org?.collabs?.includes(c.id));
  };

  $: orgcollabs = wegotorgcollabs ? filterCollabs(data) : [];
  //$: console.log(data.orgs);
  let activeTab = "about";
  let tabs = ["about", "projects", "collabs", "legend"];
</script>

<svelte:head>
  <title>Hypha 0</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <section class="org-header">
    <div class="logo-wrapper">
      <OrgLogo logoSrc={data.org.logo} width={240} height={200} />
    </div>
    <div class="heading-wrapper">
      <OrganicText tagType="h1" textContent={data.org.name} />
      <EntityHeading textContent="A Boulder-Area" entityType="org" />
    </div>
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
    <AboutOrg {data} {org} />
  </section>
  <section class="inner" class:hidden={activeTab != "projects"}>
    <ProjectsList projects={data.projects} />
  </section>
  <section class="inner" class:hidden={activeTab != "collabs"}>
    {#if wegotorgcollabs}
      <div class="padded">
        <OrganicText textContent="Collaborative involvement" />
      </div>
      <div class="padded">
        <ul class="chip-list">
          {#each orgcollabs as collab}
            <li>
              <EntityChip
                address="/c/{collab.id}"
                label={collab.name}
                entityType="collab"
              />
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <p>Not known to be involved in any collaboratives</p>
    {/if}
  </section>
  <section class="inner" class:hidden={activeTab != "legend"}>
    <EntityLegend {data} />
    <BaseballCard arenas={data.arenas} org={data.org} collabs={data.collabs} />
  </section>
</main>

<style>
  .org-header {
    display: flex;
    flex-direction: row;
  }
  .logo-wrapper {
    flex: 1;
    padding-left: 2em;
    padding-right: 0.5em;
  }
  .heading-wrapper {
    flex: 3;
    padding-left: 0.5em;
    padding-right: 2em;
  }
</style>
