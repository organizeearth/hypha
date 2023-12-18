<script>
    import "@fontsource/anybody/500.css";
    import "@fontsource/anybody/700.css";
    import "@fontsource/anybody/900.css";
    import "@fontsource/anybody/500-italic.css";
    import "@fontsource/anybody/700-italic.css";
    import "@fontsource/anybody/900-italic.css";

    export let tagType = "h3";
    export let textContent = "Example";

    function getRandomItem(set) {
        let items = Array.from(set);
        return items[Math.floor(Math.random() * items.length)];
    }

    const weights = [500, 700, 700, 700, 900, 900, 900, 900, 900, 900, 900, 900, 900];

    const styles = ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'italic'];

    const letters = textContent.split("");
    const letterWeights = letters.map(x => getRandomItem(weights));
    const letterStyles = letters.map(x => getRandomItem(styles));
</script>

{#if tagType == "h1"}
<h1>
    
    {#each letters as letter, i}
    <span
    style:font-style={letterStyles[i]}
    style:font-weight={letterWeights[i]}>{letter}</span>
    {/each}
</h1>
{/if}

{#if tagType == "h2"}
<h2>
    
    {#each letters as letter, i}
    <span
    style:font-style={letterStyles[i]}
    style:font-weight={letterWeights[i]}>{letter}</span>
    {/each}
</h2>
{/if}


{#if tagType == "h3"}
<h3>
    
    {#each letters as letter, i}
    <span
    style:font-style={letterStyles[i]}
    style:font-weight={letterWeights[i]}>{letter}</span>
    {/each}
</h3>
{/if}


<style>
    * {
        font-family: Anybody;
    }
</style>