<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    const { children, class: cls = '' }: { children: Snippet; class: string } = $props();
</script>

<div class={twMerge('flex flex-col items-center justify-center rounded-md border-2 border-primary bg-accent p-4', cls)}>
    {@render children()}
</div>
