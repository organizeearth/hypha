<script>
  import OrganicText from "$lib/organicText.svelte";
  import EntityHeading from "$lib/entityHeading.svelte";
  import EntityChip from "$lib/entityChip.svelte";
  import EntityLegend from "$lib/entityLegend.svelte";
  import EntityFlower from "$lib/entityFlower.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  //$: if (wegotorgs) console.log(data.orgs[0]);
  $: wegotcollabs = data && typeof data.collabs !== "undefined";
  //$: if (wegotcollabs) console.log(data.collabs[0]);
  $: wegotanorg = data && typeof data.org != "undefined";
  $: wegotorgcollabs =
    wegotanorg &&
    wegotcollabs &&
    data.org?.collabs?.length &&
    data.collabs.length;

  $: wegotnets = data && typeof data.nets !== "undefined";
  $: orgcollabs = wegotorgcollabs
    ? data.collabs.filter((c) => data.org.collabs.includes(c.id))
    : [];
  //$: console.log(data.orgs);
  let activeTab = "latest";
  let tabs = ["latest", "events", "resources", "orgs","networks", "legend"];

  const questions = [
    {
      order: 0,
      q: "why",
      a: "So that all Boulder County children receive fresh, local, nutritious school lunches.",
    },
    {
      order: 1,
      q: "who",
      a: "Students, family and community of the St. Vrain Valley School District.",
    },
    {
      order: 2,
      q: "what",
      a: "Piloting an expansion of local food procurement similar to the lunches offered at nearby Boulder public schools",
    },
    {
      order: 3,
      q: "where",
      a: "The St. Vrain Valley School district is located...",
    },
    {
      order: 4,
      q: "when",
      a: "Starting in at least 2019, school community members have been advancing this initiative.",
    },
    {
      order: 5,
      q: "how",
      a: "Local procurement involves budget changes at the school district level, and involves local area farms.",
    },
  ];
</script>

<svelte:head>
  <title>Hypha 0</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <section>
    <OrganicText tagType="h1" textContent={data.project.name} />
    <EntityHeading textContent="A Boulder-Area" entityType="project" />
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
  <section class="inner" class:hidden={activeTab != "latest"}>
    <OrganicText textContent="Latest" />
  </section>
  <section class="inner" class:hidden={activeTab != "events"}>
    <OrganicText textContent="Events" />
  </section>
  <section class="inner" class:hidden={activeTab != "resources"}>
    <OrganicText textContent="Resources" />
  </section>
  <section class="inner" class:hidden={activeTab != "orgs"}>
    <OrganicText textContent="Orgs" />
  </section>
  <section class="inner" class:hidden={activeTab != "networks"}>
    {#if wegotnets}
      <OrganicText textContent="Networks" />
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
    {/if}
  </section>
  <section class="inner" class:hidden={activeTab != "legend"}>
    <EntityLegend {data} />
  </section>
</main>

<style>
</style>
