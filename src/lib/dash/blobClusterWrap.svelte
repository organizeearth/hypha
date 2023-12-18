<script>
  import { forceX, forceY, forceCollide, forceRadial } from "d3-force";

  import BlobCluster from "$lib/dash/blobCluster.svelte";
  import { orgCollide } from "$lib/dash/forceUtils";
  import { centerCircleId } from "$lib/dash/dashUtils";

  let element;
  export let activeOrgId;

  // CONFIG

  let outsideCircleForce = 0.01;
  let outerCircleForce = 0.065;
  let innerCircleForce = 0.3;
  let centerCircleForce = 0.4;

  // Original simulation configurations
  let centerPosition = [200, 200];
  let useForceCollide = true;
  let useForceRadial = false;
  $: activeForceX = forceX()
    .x(centerPosition[0])
    .strength(function (node) {
      return node.id === centerCircleId
        ? centerCircleForce
        : node.isFrontline
        ? innerCircleForce
        : node?.collabs?.length || 0
        ? outerCircleForce
        : outsideCircleForce;
    });
  $: activeForceY = forceY()
    .y(centerPosition[1])
    .strength(function (node) {
      //return node.isFrontline ? innerCircleForce : outerCircleForce;
      return node.id === centerCircleId
        ? centerCircleForce
        : node.isFrontline
        ? innerCircleForce
        : node?.collabs?.length || 0
        ? outerCircleForce
        : outsideCircleForce;
    });
  $: activeForceCollide = forceCollide(function (node) {
    return orgCollide(node);
  });
  $: activeForceRadial = forceRadial()
    .radius(500)
    .x(centerPosition[0])
    .y(centerPosition[1]);
  $: forces = [
    ["x", activeForceX],
    ["y", activeForceY],
    useForceCollide && ["collide", activeForceCollide],
    useForceRadial && ["radial", activeForceRadial],
  ].filter((d) => d);

  export let dots;
  // const numberOfDots = 100;
  // export let dots = new Array(numberOfDots).fill(0).map((_) => ({}));

  const onClick = (e) => {
    if (!element) return;
    //const bounds = element.getBoundingClientRect();
    //const x = e.clientX - bounds.left;
    //const y = e.clientY - bounds.top;
    //centerPosition = [x, y];
  };
</script>

<div on:click={onClick} bind:this={element}>
  <BlobCluster on:activateforce {forces} {dots} {activeOrgId} />
</div>

<style>
</style>
