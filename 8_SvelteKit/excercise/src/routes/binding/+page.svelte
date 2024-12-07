<script lang="ts">
    let name = $state('Patrik');

    let counter = $state(0);
</script>

<input type="text" bind:value={name} />
{name}

<button onclick={() => (name = 'Patrik')}>Reset</button>

<button onclick={() => counter++}>{counter}</button>

{#if counter > 20}
    <h1>WOWW</h1>
{:else if counter > 10}
    <h2>Skoro</h2>
{:else if counter > 5}
    <h3>Okay</h3>
{:else}
    <h4>trapný</h4>
{/if}
