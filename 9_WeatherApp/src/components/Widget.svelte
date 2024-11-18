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
        })
    });

    export const schema = z
        .object({
            cod: z.coerce.number(),
            message: z.string()
        })
        .or(OKSchema);
</script>

<script lang="ts">
    const { data }: { data: z.infer<typeof OKSchema> } = $props();
</script>

{JSON.stringify(data)}
