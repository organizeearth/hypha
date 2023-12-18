<script>
  import CircleArcPoint from "./circleArcPoint.svelte";

  export let cx = 100;
  export let cy = 100;
  export let r = 75;
  export let stroke = "#ff0000";
  export let fill = "transparent";
  export let points = [
    {
      label: "X",
      stroke: "black",
      n: 0,
    },
    {
      label: "A",
      stroke: "green",
      n: 1,
    },
    {
      label: "B",
      stroke: "brown",
      n: 2,
    },
    {
      label: "C",
      stroke: "orange",
      n: 3,
    },
    {
      label: "D",
      stroke: "red",
      n: 4,
    },
  ];

  const path = () => {
    return `M ${cx} ${cy}
    m ${r}, 0
    a ${r},${r} 0 1,0 -${r * 2},0
    a ${r},${r} 0 1,0  ${r * 2},0
    `;
  }
</script>

<path class="circle-arc"
  {stroke}
  {fill}
  d="{path()}"
/>
{#each points as point, i}
  <CircleArcPoint path="{path()}" {...point} id={i} />
{/each}

<style>
</style>
