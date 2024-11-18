<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';

    let { value = $bindable(), ...props }: HTMLInputAttributes = $props();
</script>

<input {...props} bind:value class="border-b-accent text-text border-b-2 bg-transparent px-2 py-0.5 text-xl font-bold outline-none placeholder:text-white" />
