<script>
    import "@fontsource/delicious-handrawn";

    export let tagType = "h1";
    export let textContent = "Example";
    export let color = 'rgba(15, 0, 127, 1)';

    $: style = `color: ${color};`;

</script>

{#if tagType == "h1"}
<h1 {style}>{textContent}</h1>
{/if}

{#if tagType == "h2"}
<h2>{textContent}</h2>
{/if}

{#if tagType == "h3"}
<h3>{textContent}</h3>
{/if}

<style>
    * {
        font-family: 'Delicious Handrawn', cursive;
    }
</style>