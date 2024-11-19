<script lang="ts" module>
    import { z } from 'zod';

    const OKSchema = z.object({
        coord: z.object({
            lon: z.number(),
            lat: z.number()
        }),
        weather: z.array(
            z.object({
                id: z.number(),
                main: z.string(),
                description: z.string(),
                icon: z.string()
            })
        ),
        main: z.object({
            temp: z.number(),
            feels_like: z.number(),
            temp_min: z.number(),
            temp_max: z.number(),
            pressure: z.number(),
            humidity: z.number(),
            sea_level: z.number(),
            grnd_level: z.number()
        }),
        wind: z.object({
            speed: z.number(),
            deg: z.number()
        }),
        clouds: z.object({
            all: z.number()
        }),
        sys: z.object({
            country: z.string(),
            sunrise: z.number(),
            sunset: z.number()
        }),
        name: z.string()
    });

    export const schema = z
        .object({
            cod: z.coerce.number(),
            message: z.string()
        })
        .or(OKSchema);
</script>

<script lang="ts">
    import Record from './Record.svelte';
    import { formatDate } from '$/lib/functions';

    const { data }: { data: z.infer<typeof OKSchema> } = $props();

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
