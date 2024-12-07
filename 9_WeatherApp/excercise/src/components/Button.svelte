<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';

    const { children, ...props }: HTMLButtonAttributes = $props();
</script>

<button {...props} class="bg-primary hover:bg-accent rounded-md px-4 py-2 text-xl font-bold text-white transition-all duration-200 active:translate-y-1">
    {@render children?.()}
</button>
