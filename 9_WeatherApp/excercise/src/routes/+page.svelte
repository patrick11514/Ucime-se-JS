<script lang="ts">
    import Button from '$/components/Button.svelte';
    import Input from '$/components/Input.svelte';
    import Row from '$/components/Row.svelte';
    import { fetchFromAPI } from '$/lib/functions';
    import { WeatherAPISchema } from '$/lib/schemas';
    import { PUBLIC_API_KEY } from '$env/static/public';
    import { z } from 'zod';

    let city = $state('');

    const search = async () => {
        const data = await fetchFromAPI(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${PUBLIC_API_KEY}&lang=en&units=metric`, WeatherAPISchema);

        if (data == undefined) {
            return undefined;
        }

        if ('message' in data) {
            return null;
        }

        return data;
    };

    let promise = $state<ReturnType<typeof search>>();

    const getData = () => {
        promise = search();
    };
</script>

<section class="m-auto flex w-[50%] min-w-64 flex-col items-center justify-center gap-2 rounded-md border-2 border-accent bg-secondary p-4">
    <h1 class="text-center text-4xl font-bold text-primary">Cool Weather APP</h1>
    <Row>
        <Input bind:value={city} placeholder="Enter city name" />
        <Button onclick={getData}>Search</Button>
    </Row>
    {#if promise}
        {#await promise}
            <h2>Načítání...</h2>
        {:then result}
            {#if result === undefined}
                <h2>Nepovedlo se získat data :(</h2>
            {:else if result === null}
                <h2>Zadal jsi špatné město.</h2>
            {:else}
                <h2>Data úspěšně získana</h2>
            {/if}
        {/await}
    {/if}
</section>

<h6 class="pepa">AHOJ</h6>

<style>
    :global(.pepa) {
        color: blue;
    }
</style>
