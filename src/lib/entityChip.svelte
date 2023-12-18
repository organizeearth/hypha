<script>
  import chroma from "chroma-js";
  import { entities } from "$lib/entities.js";
  export let entityType = "unknown";
  export let address = "/";
  export let label = "Unknown";
  export let isCompact = false;
  export let extra = "";

  const entity =
    typeof entities[entityType] !== "undefined"
      ? entities[entityType]
      : entities.unknown;

  const maxLength = 50;
  const trimmedLabel =
    label.length > maxLength ? label.substring(0, maxLength) + "…" : label;

  const color = chroma(entity.color).luminance(0.1);
</script>

<div class:isCompact class="entity-chip-wrapper" style:border-color={color}>
  <div class="thumb">&nbsp;</div>
  <div class="info">
    <a style:color href={address}>
      <h3>{trimmedLabel}</h3>
      <div class="type-label">
        {entity.ichar}
        {entity.label}
        {#if extra.length}
          <span class="extra">
            {extra}
          </span>
        {/if}
      </div>
    </a>
  </div>
</div>

<style>
  h3 {
    font-weight: bold;
    margin: 0;
  }
  .entity-chip-wrapper {
    display: flex;
    flex-direction: row;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
    text-align: left;
  }
  .thumb {
    width: 45px;
    height: 45px;
    background: rgba(0, 0, 0, 0.25);
    margin-right: 0.5em;
  }
  .info {
    flex: 1;
  }
  .entity-chip-wrapper:hover {
    cursor: pointer;
  }
  .entity-chip-wrapper:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  a:hover {
    text-decoration: none;
  }
  .entity-chip-wrapper:hover h3 {
    text-decoration: underline;
  }
  .isCompact .type-label {
    display: none;
  }
  .isCompact {
    font-size: 0.8em;
  }
</style>
