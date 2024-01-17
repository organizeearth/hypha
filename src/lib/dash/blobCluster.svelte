<script>
    import { forceSimulation } from "d3-force";
    import { entities } from "../entities";
    import { orgCollide, orgRadius } from "$lib/dash/forceUtils";
    import { createEventDispatcher } from "svelte";
    import { centerCircleId } from "$lib/dash/dashUtils.js";
  
    const dispatch = createEventDispatcher();
  
    function dispatchActivateForce(id) {
      //console.log("Hello... " + id);
      dispatch("activateforce", {
        id: id,
      });
    }
  
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
  
    // an array of our particles
    export let dots = [];
    // an array of [name, force] pairs
    export let forces = [];
  
    let usedForceNames = [];
    let renderedDots = [];
  
    /**
     * @type {string}
     */
    export let activeOrgId;
  
    let width = 464;
    $: height = 380;
  
    $: simulation = forceSimulation()
      .nodes(dots)
      .on("tick", () => {
        // update the renderedDots reference to trigger an update
        renderedDots = [...dots];
      });
  
    $: {
      // re-initialize forces when they change
      forces.forEach(([name, force]) => {
        simulation.force(name, force);
      });
  
      // remove old forces
      const newForceNames = forces.map(([name]) => name);
      let oldForceNames = usedForceNames.filter(
        (force) => !newForceNames.includes(force)
      );
      oldForceNames.forEach((name) => {
        simulation.force(name, null);
      });
      usedForceNames = newForceNames;
  
      // kick our simulation into high gear
      simulation.alpha(1);
      simulation.restart();
    }
    const faint = (color) => {
      return color.slice(0, -2) + "0.5)";
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
  </script>
  
  <figure class="c" bind:clientWidth={width}>
    <svg {width} {height}>
      <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
        {#each renderedDots as d, i}
          <g style={move(d.x, d.y)}>
            <circle
              class:active={d.id == activeOrgId}
              on:click={() => dispatchActivateForce(d.id)}
              style={colorByCategory(d)}
              r={orgRadius(d)}
            />
            {#if d.id === centerCircleId}
              <text fill="black" font-size="2em" y="10" text-anchor="middle"
                >CJC</text
              >
              <!--<text text-anchor="middle"
                >{d.id.slice(-2) + " " + activeOrgId}</text
              >-->
            {/if}
          </g>
        {/each}
      </g>
    </svg>
  </figure>
  
  <style>
    figure {
      margin: 0;
    }
    svg {
      overflow: visible;
    }
    circle {
      fill: #6a6b6b;
    }
    .active {
      stroke: black;
      stroke-width: 4px;
    }
  </style>
  