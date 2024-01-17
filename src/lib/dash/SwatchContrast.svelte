<script>
  export let selected = false;
  export let value = "support";
  export let id = 0;
  export let label = "Loading...";
  import { activeProximity } from "../../routes/d/[id]/stores";

  /** @type string */
  let activeProximity_value;
  activeProximity.subscribe((value) => {
    activeProximity_value = value;
  });

  function update() {
    if (activeProximity_value == value) {
      activeProximity.set("ANY");
    } else {
      activeProximity.set(value);
    }
  }

  $: itemStyle = selected ? `border: 2px solid black;` : ``;
  $: pStyle = selected ? `font-weight: heavy;` : ``;
</script>

<li style={itemStyle} on:click={update}>
  <p style={pStyle}>{label}</p>
</li>

<style>
  li {
    display: flex;
    border-radius: 1em;
    height: 2em;
    align-items: center;
    background: white;
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
