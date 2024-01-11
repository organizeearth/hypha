<script>
  import OrganicText from "$lib/organicText.svelte";
  import CollabGraph from "$lib/CollabGraph.svelte";
  import EntityChip from "$lib/entityChip.svelte";
  import EntityFlower from "$lib/entityFlower.svelte";
  import EntityHeading from "$lib/entityHeading.svelte";
  import EntityLegend from "$lib/entityLegend.svelte";
  import ProjectsList from "$lib/lists/ProjectsList.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  function groupOrgsWithCollabs(orgs, collabs) {
    return collabs.map(function (c) {
      return {
        ...c,
        orgObjects: orgs.filter((o) => c.orgs.includes(o.id)),
      };
    });
  }

  $: wegotorgs = data && typeof data.orgs !== "undefined";
  //$: if (wegotorgs) console.log(data.orgs[0]);
  $: wegotcollabs = data && typeof data.collabs !== "undefined";
  //$: if (wegotcollabs) console.log(data.collabs[0]);
  $: collabs = wegotcollabs ? data.collabs : [];
  $: collabsWithOrgs =
    wegotcollabs && wegotorgs
      ? groupOrgsWithCollabs(data.orgs, data.collabs)
      : [];

  const questions = [
    {
      order: 0,
      q: "why",
      a: "To foster collaboration and connectivity for justice-based climate action and impact in Boulder County, Colorado. To inform, coordinate, and incentivize collaboration across the climate justice movement, shifting the paradigm of how communities work better together.",
    },
    {
      order: 1,
      q: "who",
      a: "Naropa University’s Joanna Macy Center for Resilience and Regeneration and the volunteer team that built Boulder Dot Earth have created the BoCo Climate Justice Hive to not just manage the website, but to actively bring together various community-based climate justice efforts.",
    },
    {
      order: 2,
      q: "what",
      a: "Coordinated climate justice efforts uplifting a caring and connected community whose systems support equity, resilience, and well-being for all, including future generations and the rest of the natural world.",
    },
    {
      order: 3,
      q: "where",
      a: "The state of Colorado is the ancestral homeland and traditional territories of the Cheyenne, Arapahoe and Ute Nations and includes 38 other Indigenous nations. (From University of Colorado Land Acknowledgement)",
    },
    {
      order: 4,
      q: "when",
      a: "Boulder County adopted bold goals to reduce community GHG emissions 45% below 2005 levels by 2030 and 90% below 2005 levels by 2050. While reaching these goals will be a significant challenge, Boulder County is committed to transitioning to a low-carbon future and a clean energy economy.",
    },
    {
      order: 5,
      q: "how",
      a: "The Hive collects and shares up-to-date information about who’s doing what and where, “cross-pollinating” neighborhoods, communities, and sectors in Boulder County by weaving connections from grassroots to grass-tops and across the non-profit, academic, business, and government worlds. ",
    },
  ];

  let activeTab = "about";
  let tabs = ["about", "collabs", "orgs", "projects", "legend"];
</script>

<svelte:head>
  <title>Hypha Blueprint</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <section>
    <OrganicText tagType="h1" textContent={data.net.name} />

    <EntityHeading
      textContent="A Boulder-Area Climate Justice Coordination"
      entityType="network"
    />
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
  <section class="inner" class:hidden={activeTab != "collabs"}>
    <div>
      {#if wegotcollabs}
        <OrganicText textContent="Collabs" />
        <section class="chip-list-wrapper">
          <ul class="chip-list">
            {#each collabsWithOrgs as collab}
              <!-- Note: field names are case sensitive-->
              <li>
                <EntityChip
                  address="/c/{collab.id}"
                  label={collab.name}
                  extra={"(" + collab.orgObjects?.length + " orgs)"}
                  entityType="collab"
                />
              </li>
            {/each}
          </ul>
        </section>
        <section>
          <CollabGraph {collabsWithOrgs} />
        </section>
      {:else}
        <p>No records</p>
      {/if}
    </div>
  </section>

  <section class="inner" class:hidden={activeTab != "orgs"}>
    <div class="padded">
      {#if wegotorgs}
        <OrganicText textContent="Orgs" />
        <section class="chip-list-wrapper">
          <ul class="chip-list">
            {#each data.orgs as org}
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
      {:else}
        <p>No records</p>
      {/if}
    </div>
  </section>

  <section class="inner" class:hidden={activeTab != "projects"}>
    <ProjectsList projects="{data.projects}" />
  </section>
  <section class="inner" class:hidden={activeTab != "about"}>
    <EntityFlower {questions} />
  </section>
  <section class="inner" class:hidden={activeTab != "legend"}>
    <EntityLegend {data} />
  </section>
</main>

<style>
</style>
