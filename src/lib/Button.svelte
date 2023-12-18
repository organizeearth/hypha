<script>
    export let text;
    export let link;
    export let external = false;

    $: target = external ? '_blank' : '_parent';
</script>

    <a href="{link}" {target} >{text}</a>

<style>
    a {
        border-radius: 3px;
        text-decoration: none;
        padding: 1em 2em;
        color: var(--color-text);
        font-weight: bold;
        border: 2px solid var(--color-text); 
        margin-bottom: 2em;
    }
    a:hover {
        text-decoration: none;
        color: white;
        background: var(--color-text);
    }
</style>