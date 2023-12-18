<script>
    export let color;
    export let label;

    const faint = (color) => {
        return color.slice(0, -2) + '0.2)';
    }

    $: spanStyle = `background: ${color};`;
    $: itemStyle = `background: ${faint(color)}`;
    $: pStyle = `color: ${color}`;
</script>

<li style={itemStyle}>
    <span style={spanStyle}></span>
    <p style={pStyle}>{label}</p>
</li>

<style>
    li {
        display: flex;
        border-radius: 1em;
        align-items: center;
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