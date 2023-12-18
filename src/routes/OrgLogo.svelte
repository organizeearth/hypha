<script>
    export let logoSrc = "";
    export let width = 240;
    export let height = 200;

    $: logo = logoSrc || "https://upload.wikimedia.org/wikipedia/commons/3/34/BSicon_MHUB.svg";
    const styles = (logo, width, height) => {
        return `background: url(${logo});`
        + `width: ${width};`
        + `height: ${height}`;
    }
</script>

<div class="logo" style="{styles(logo, width, height)}">
</div>

<style>
    .logo {
        background-color: lightgray;
        min-height: 100px;
    }
</style>