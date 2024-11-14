<script lang="ts">
    let name = $state('Patrik');
    const age = 55;

    const kliknulJsem = () => {
        console.log('click');
    };

    const onclick = () => {
        console.log('click2');
    };

    let counter = $state(5);
</script>

<p>{name} - {age}</p>

<button onclick={kliknulJsem}>Ahoj</button>

<button onclick={() => console.log('click')}>Ahoj</button>

<button {onclick}>Ahoj</button>

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

<input type="text" value={name} />
{name}
<input type="text" bind:value={name} />
{name}
