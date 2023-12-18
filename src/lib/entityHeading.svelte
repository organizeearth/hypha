<script>
  import chroma from "chroma-js";
  import { entities } from "$lib/entities.js";
  import "@fontsource/anybody/400.css";

  export let entityType = "unknown";
  export let extra = "";

  export let textContent = "A Boulder-Area ";
  const entity =
    typeof entities[entityType] !== "undefined"
      ? entities[entityType]
      : entities.unknown;

  const color = chroma(entity.color).luminance(0.1);
  const colorBg = "rgba(" + chroma(entity.color).luminance(0.2).alpha(0.2).rgba() + ")";
  //$: console.log(colorBg);
</script>

<div class="entity-heading">
  <h4>
    {textContent}
    {#if entityType !== "none"}
    <div class="type-label" style:color="{color}" style:background="{colorBg}">
      {entity.ichar}&nbsp;{entity.label}
      {#if extra.length}
        <span class="extra">
          {extra}
        </span>
      {/if}
    </div>
    {/if}
  </h4>
</div>

<style>
    .entity-heading {
        width: 100%;
        text-align: center;
    }
  h4 {
    font-weight: 400;
    font-family: "Anybody", sans-serif;
  }
  .type-label {
    display: inline;
    margin-left: 0.5em;
    padding: 0.5em 0.5em 0.3em;
    border-radius: 5px;
  }
</style>
