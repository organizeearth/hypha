<script>
  import OrgLogo from "../routes/OrgLogo.svelte";
  import { filterRefs } from "./dataUtils";
  import { entities } from "./entities";

  export let org = {};
  export let arenas = [];
  export let collabs = [];

  $: top = org.arenas
    ? org.arenas.length > 3
      ? org.arenas.slice(0, 3)
      : org.arenas
    : [];
  $: orgArenas = filterRefs(arenas, top);
  $: orgCollabs = filterRefs(collabs, org.collabs);

  const isValidUrl = (urlString) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  //console.log({ org })

  $: isValidWebsite = isValidUrl(org.website);

  //console.log({ orgArenas });
  const outlineStyle = (org) => {
    return `border-color: ${entities.sectorColors[org.colorcategory]};`;
  };
</script>

<div class="baseball-card" style={outlineStyle(org)}>
  <div class="logo-wrap">
    <OrgLogo logoSrc={org?.logo} />
  </div>
  <div class="name-wrap">
    <h4><a href="/o/{org.id}">{org.name}</a></h4>
  </div>
  {#if orgCollabs.length}
    <div class="bucket">
      <div class="collabs-wrap">
        <h5>Active collaborations</h5>
        <ul>
          {#each orgCollabs as collab}
            <li>{collab.name}</li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
  <div class="bucket">
    <div class="description-wrap">
      <p class="description">{org.description}</p>
    </div>
    {#if orgArenas.length}
      <div class="arena-wrap">
        <h5>Top arenas</h5>
        <ul>
          {#each orgArenas as arena}
            <li>{arena.name}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  {#if isValidWebsite}
    <div class="website-link-wrap">
      <a href={org.website} target="_blank">{org.website}</a>
    </div>
  {/if}
</div>

<style>
  .baseball-card {
    border-style: solid;
    border-width: 2px;
    border-radius: 0.5em;
    max-width: 360px;
    padding-bottom: 1em;
  }
  ul {
    margin: 0;
  }
  li {
    list-style-type: none;
    border: 1px solid gray;
    border-radius: 0.5em;
    display: inline-block;
    padding: 0.25em 0.5em;
    margin: 0.25em;
  }
  .logo-wrap {
    margin: 0.5em;
    border-radius: 0.5em;
  }
  .name-wrap {
    margin: 0 0.5em;
  }
  .website-link-wrap {
    margin: 0 0.5em;
    text-align: center;
  }
  h5 {
    text-transform: uppercase;
    margin: 0;
    color: #444;
  }
  .bucket {
    border-radius: 0.5em;
    border-color: #444;
    border-style: solid;
    margin: 0.5em;
    padding: 0.5em;
    border-width: 1px;
  }
  .description {
    font-size: 0.85em;
    line-height: 1em;
  }
</style>
