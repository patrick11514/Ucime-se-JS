<script lang="ts">
    //type HD = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
    //type HexColor = `#${HD}${HD}${HD}` | `#${HD}${HD}${HD}${HD}${HD}${HD}`;

    const { key, value, color }: { key: string; value: string; color: `#${string}` } = $props();
</script>

<div style="border-color: {color}; background-color: color-mix(in srgb, {color}, white 25%);" class="rounded-md border-2 p-2">
    {key}: {value}
</div>
