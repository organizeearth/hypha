<script>
  export let label = "...";
  export let cx = 0;
  export let cy = 0;
  export let r = 6;
  export let strokeWidth = 2;
  export let fill = "#EE9";
  export let stroke = "#994";
  export let n = 1;
  export let d = 4;
  export let path = "M20,60a35,35 0 1,1 60,0";
  export let id = 0;
  export let groupId = 0;

  const titleId = `arc-${groupId}-item-${id}`;

  const keyPoints = () => {
    const decimal = (n / d) * 1.0;
    return `${decimal};${decimal}`;
  };
</script>

<g role="img" aria-label="{label}" aria-labelledby="{titleId}">
  <title id={titleId}>{label}</title>
<circle
  class="circle-arc-point"
  {cx}
  {cy}
  {r}
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