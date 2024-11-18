<script lang="ts">
    import Button from '$/components/Button.svelte';
    import Input from '$/components/Input.svelte';
    import Row from '$/components/Row.svelte';
    import { fetchFromAPI } from '$/lib/functions';
    import { PUBLIC_API_KEY } from '$env/static/public';
    import Widget, { schema } from '$/components/Widget.svelte';

    let city = $state('');

    const getData = async () => {
        const data = await fetchFromAPI(`https://api.openweathermap.org/data/2.5/weather?q=${city},CZ&appid=${PUBLIC_API_KEY}&lang=cz&units=metric`, schema);

        if (data === undefined) {
            return undefined;
        }

        if ('message' in data) {
            return null;
        }

        return data;
    };

    let promise = $state<ReturnType<typeof getData>>();

    const onclick = () => {
        promise = getData();
    };
</script>

<section class="m-auto flex w-[50%] min-w-64 flex-col items-center justify-center gap-2 rounded-md border-2 border-accent bg-secondary p-4">
    <h1 class="text-center text-4xl font-bold text-primary">Cool Weather APP</h1>
    <Row>
        <Input bind:value={city} placeholder="Enter city name" />
        <Button {onclick}>Search</Button>
    </Row>
    {#if promise}
        {#await promise}
            <h2 class="text-2xl font-bold">Načítání...</h2>
        {:then result}
            {#if result === undefined}
                <h2 class="text-2xl font-bold">Nepovedlo se získat data :(</h2>
            {:else if result === null}
                <h2 class="text-2xl font-bold">Zadal jsi neplatné město.</h2>
            {:else}
                <Widget data={result} />
            {/if}
        {/await}
    {/if}
</section>
