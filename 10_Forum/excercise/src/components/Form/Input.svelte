<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    let { value = $bindable(), class: cls, ...props }: HTMLInputAttributes = $props();
</script>

<input
    {...props}
    bind:value
    class={twMerge('rounded-md border-2 border-black px-2 py-1 text-lg font-bold text-text outline-none transition-colors duration-500 invalid:border-red-500', cls)}
/>
