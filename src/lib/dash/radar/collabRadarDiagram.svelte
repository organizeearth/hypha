<script>
  import { entities } from "../../entities";
  import CircleArc from "./circleArc.svelte";
  //import { createEventDispatcher } from "svelte";
  import { centerCircleId } from "$lib/dash/dashUtils.js";

  //const dispatch = createEventDispatcher();

  // utility function for translating elements
  //const move = (x, y) => `transform: translate(${x}px, ${y}px`;
  const move = (x, y) => {
    return (
      "transform: translate(" +
      (x - width / 2) +
      "px," +
      (y - height / 2) +
      "px"
    );
  };

  export let renderedDots = [];

  /**
   * @type {string}
   */
  export let activeOrgId;

  let width = 464;
  $: height = 380;

  const faint = (color) => {
    return color.slice(0, -2) + "0.5)";
  };

  const tableStyle = () => {
    return `transform: translate(${width / 2}px, ${height / 2}px)`;
  };

  const colorByCategory = (d) => {
    if (d.id === centerCircleId) {
      return `fill: transparent; text-color: black; stroke: black; stroke-width: 3px;`;
    }
    let fill = entities.sectorColors[d.colorcategory];
    if (typeof d.lat === "undefined") {
      fill = faint(fill);
    }
    return `fill: ${fill}`;
  };

  const onClick = (e) => {
    console.log({ e, renderedDots });
  };

  const kp = "0.4";
  let keyPoints = () => {
    return `${kp};${kp}`;
  };

  $: cx = width / 3;
  $: cy = height / 2.5;
</script>

<figure class="c" bind:clientWidth={width}>
  <svg height="300px">
    <CircleArc r="50" {cx} {cy} />
    <CircleArc r="75" {cx} {cy} />
    <CircleArc r="100" {cx} {cy} />
  </svg>
  <!--
  <svg {width} {height}>
    <circle class="table" cx={width / 2} cy={height / 2} r={width / 10}>
      <text fill="black" font-size="2em" y="10" text-anchor="middle">CJC</text>
    </circle>
    <circle class="table" cx={width / 2} cy={height / 2} r={width / 5} />
    <circle class="table" cx={width / 2} cy={height / 2} r={width / 3.5} />
    <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
      {#each renderedDots as d, i}
        <g style={move(d.x, d.y)}>
          {#if d.id !== centerCircleId}
            <circle
              class:active={d.id == activeOrgId}
              style={colorByCategory(d)}
              r={orgRadius(d)}
            />
          {/if}
        </g>
      {/each}
    </g>
  </svg>
-->

  <!--
  <div style="width:400px">
    <svg viewBox="0 -10 100 100" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20,60a35,35 0 1,1 60,0"
        stroke="#D3D7DB"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
      />
<path d="M20,60a35,35 0 1,1 60,0" stroke="#008000" stroke-width="6" pathLength="100" fill="none" stroke-linecap="round" stroke-dasharray="50 85"></path>
 
      <circle
        cx="0"
        cy="0"
        r="6"
        stroke-width="1"
        fill="#FFFFFF"
        stroke="#008000"
      >
        <animateMotion
          begin="0s"
          dur="infinite"
          repeatCount="infinite"
          keyPoints={keyPoints()}
          fill="freeze"
          keyTimes="0;1"
          calcMode="linear"
          path="M20,60a35,35 0 1,1 60,0"
        />
      </circle>
    </svg>
  </div>
-->
</figure>

<style>
  figure {
    margin: 0;
  }
  svg {
    overflow: visible;
  }
  circle {
    fill: transparent;
    stroke-width: 4px;
    stroke: black;
  }
  .active {
    stroke: black;
    stroke-width: 4px;
  }
  .table {
  }
  .c {
    width: 100%;
  }
</style>
