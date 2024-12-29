<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    let {
        value = $bindable(),
        class: cls = '',
        invalid = $bindable(undefined),
        ...props
    }: HTMLInputAttributes & {
        invalid?: string;
    } = $props();

    let el = $state<HTMLInputElement>();

    $effect(() => {
        el?.setCustomValidity(invalid ?? '');
    });
</script>

<input
    bind:this={el}
    {...props}
    bind:value
    class={twMerge('rounded-md border-2 border-black px-2 py-1 text-lg font-bold text-text outline-none transition-colors duration-500 invalid:border-red-500', cls?.toString())}
/>
