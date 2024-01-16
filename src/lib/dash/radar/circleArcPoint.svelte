<script>
  export let label = "...";
  export let cx = 0;
  export let cy = 0;
  export let r = 6;
  export let strokeWidth = 2;
  export let fill = "white";
  export let stroke = "black";
  export let n = 1;
  export let d = 10;
  export let path = "M20,60a35,35 0 1,1 60,0";
  export let id = 0;
  export let groupId = 0;

  const radius = 8;
  const titleId = `arc-${groupId}-item-${id}`;

  const keyPoints = () => {
    const decimal = (n / d) * 1.0;
    return `${decimal};${decimal}`;
  };
</script>

<g role="img" aria-label="{label}" aria-labelledby="{titleId}" on:click={() => console.log(label)}>
  <title id={titleId}>{label}</title>
<circle
  class="circle-arc-point"
  {cx}
  {cy}
  r={radius}
  stroke-width={strokeWidth}
  {fill}
  {stroke}

>
  <animateMotion
    begin="0s"
    dur="infinite"
    repeatCount="infinite"
    keyPoints={keyPoints()}
    fill="freeze"
    keyTimes="0;1"
    calcMode="linear"
    {path}
  />
</circle>
</g>