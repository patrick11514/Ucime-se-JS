<script lang="ts">
    import Record from './Record.svelte';
    import { formatDate } from '$/lib/functions';
    import type { WeatherAPISchema } from '$/lib/schemas';
    import { z } from 'zod';

    const { data }: { data: z.infer<typeof WeatherAPISchema> } = $props();

    const weather = data.weather[0];
</script>

<div class="flex w-full flex-col items-center justify-center">
    <img class="mx-auto" src="https://openweathermap.org/img/wn/{weather.icon}@4x.png" alt="Weather icon" />
    <h1 class="mx-auto text-center text-2xl font-bold text-primary">{data.name}</h1>
    <h3 class="text-center text-xl text-accent">({weather.description})</h3>

    <h2 class="mx-auto mt-4 text-center text-2xl font-bold text-accent">Teplota</h2>
    <div class="flex flex-wrap items-center justify-center gap-2">
        <Record key="Teplota" value="{data.main.temp}°C" color="#edc80c" />
        <Record key="Pocitová teplota" value="{data.main.feels_like}°C" color="#e6a009" />
        <Record key="Minimální teplota" value="{data.main.temp_min}°C" color="#09c1e6" />
        <Record key="Maximální teplota" value="{data.main.temp_max}°C" color="#e66509" />
    </div>

    <h2 class="mx-auto mt-4 text-center text-2xl font-bold text-accent">Vítr</h2>
    <div class="flex flex-wrap items-center justify-center gap-2">
        <Record key="Rychlost" value="{data.wind.speed}m/s" color="#093de6" />
        <Record key="Směr" value="{data.wind.deg}°" color="#6909e6" />
    </div>

    <h2 class="mx-auto mt-4 text-center text-2xl font-bold text-accent">Oblačnost</h2>
    <div class="flex flex-wrap items-center justify-center gap-2">
        <Record key="Celková" value="{data.clouds.all}%" color="#bacdd1" />
    </div>

    <h2 class="mx-auto mt-4 text-center text-2xl font-bold text-accent">Slunce</h2>
    <div class="flex flex-wrap items-center justify-center gap-2">
        <Record key="Východ" value={formatDate(data.sys.sunrise * 1000)} color="#ffff00" />
        <Record key="Západ" value={formatDate(data.sys.sunset * 1000)} color="#545446" />
    </div>
</div>
