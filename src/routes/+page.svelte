<script>
  import OrganicText from "$lib/organicText.svelte";
  import EntityChip from "$lib/entityChip.svelte";
  import EntityFlower from "$lib/entityFlower.svelte";
  import EntityHeading from "$lib/entityHeading.svelte";
  import EntityLegend from "$lib/entityLegend.svelte";
  import { questions } from "$lib/demo/demo";
  /** @type {import('./$types').PageData} */
  export let data;

  $: wegotnets = data && typeof data.nets !== "undefined";
  $: collabs = data && typeof data.collabs !== "undefined" ? data.collabs : [];

  let activeTab = "networks";
  let tabs = ["networks", "legend"];
</script>

<svelte:head>
  <title>Hypha 0</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <section>
    <OrganicText tagType="h1" textContent="Grassroots Alliance" />
    <EntityHeading
      textContent="A prototype tech tool for climate justice coordination networks"
      entityType="none"
    />
    <EntityFlower {questions} />
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
  <section class="inner" class:hidden={activeTab != "networks"}>
    {#if wegotnets}
      <OrganicText textContent="Networks" />
      <p>There is currently <strong>1</strong> network using Hypha Blue</p>
      <section class="chip-list-wrapper">
        <ul class="chip-list">
          {#each data.nets as network}
            <!-- Note: field names are case sensitive-->
            <li>
              <EntityChip
                address="/n/{network.id}"
                label={network.name}
                extra={"(3 collabs)"}
                entityType="network"
              />
            </li>
          {/each}
        </ul>
      </section>
    {:else}
      <p>No records</p>
    {/if}
    <OrganicText textContent="Dashboards" />
    <div class="flexbox">
      {#each collabs as collab}
        <EntityChip
          address="/d/{collab.id}"
          label={collab.name}
          entityType="collab"
        />
      {/each}
    </div>
  </section>
  <section class="inner" class:hidden={activeTab != "legend"}>
    <EntityLegend {data} />
  </section>
</main>
<style>
  .flexbox {
    display: flex;
    flex-direction: column;
  }
</style>