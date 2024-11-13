<script lang="ts">
    const name = 'Patrik';
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
