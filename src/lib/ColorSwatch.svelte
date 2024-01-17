<script>
  export let color;
  export let label;
  export let sector;
  import { activeSector } from "../routes/d/[id]/stores";
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

  let activeSector_value;
  activeSector.subscribe((value) => {
    activeSector_value = value;
  });

  function update() {
    if (activeSector_value == sector.id) {
      activeSector.set("ANY");
    } else {
      activeSector.set(sector.id);
    }
  }

  const faint = (color) => {
    return color.slice(0, -2) + "0.2)";
  };

  $: active = activeSector_value == sector.id;
  $: spanStyle = `background: ${color};`;
  $: itemStyle = active
    ? `background: ${faint(color)}; border-width: 3px; border-color: ${color}`
    : `background: transparent; border-width: 3px; border-color: ${faint(
        color
      )}`;
  $: pStyle = `color: ${color}`;
</script>

<li style={itemStyle} on:click={update}>
  <span style={spanStyle}></span>
  <p style={pStyle}>{label}</p>
</li>

<style>
  li {
    display: flex;
    border-radius: 1em;
    align-items: center;
    border-width: 3px;
  }
  span {
    flex: 1;
    height: 2em;
    width: 2em;
    border-radius: 2em;
  }
  p {
    flex: 3;
    font-weight: bold;
    margin: 0 1em;
  }
</style>
