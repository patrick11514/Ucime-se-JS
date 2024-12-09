<script lang="ts">
    import type { Snippet } from 'svelte';

    const { children, id = '', label, error = undefined }: { children: Snippet; id?: string; label: string; error?: string } = $props();
</script>

<div class="flex flex-col">
    <label class="mb-2 text-lg font-bold lg:text-xl" for={id}>{label}</label>
    {@render children()}
    <span class:invisible={!error} class="text-sm font-bold text-red-500">{error ?? '...'}</span>
</div>
