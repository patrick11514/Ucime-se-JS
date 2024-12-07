<script lang="ts">
    let a = { a: 'Ahoj Svete', b: 10, c: true };

    let variable = 65;

    const ovoce = ['Jablko', 'Mandarinka', 'Kiwi', 'Pomeranč'];

    const promise = new Promise((resolve) => setTimeout(() => resolve(15), 5 * 1000));

    const name = 'Patrik';
    const age = 55;

    const kliknulJsem = () => {
        console.log('click');
        type = 'password';
    };

    let type = $state('text');

    function onclick() {
        console.log('baf');
    }

    let counter = $state(5);
</script>

<h1>{JSON.stringify(a)}</h1>

{#if variable > 50}
    <span>Super variable je {variable}</span>
{:else if variable > 10}
    <span>Celkem ujde, variable je {variable}</span>
{:else}
    <span>Malé :/ {variable}</span>
{/if}

<ul>
    {#each ovoce as item, id}
        <li>{item} - {id}</li>
    {/each}
</ul>

{#await promise}
    Čekáme
{:then result}
    Dojelo to, toto je undefined: {result}
{/await}

<p>{name} - {age}</p>

<button onclick={kliknulJsem}>Klikni</button>
<button onclick={() => console.log('Ahoj')}>Klikni</button>
<button {onclick}>AAAA</button>

<input {type} />
<p>{counter}</p>
<button onclick={() => counter++}>{counter}</button>

<style>
    h1 {
        color: blue;
    }
</style>
