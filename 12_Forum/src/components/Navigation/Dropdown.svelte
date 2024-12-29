<script lang="ts">
    import type { BootstrapIcon } from '$/types/bootstrap_icons';
    import type { Snippet } from 'svelte';
    import Icon from '../Icon.svelte';
    import ClickOutside from '../clickOutside.svelte';
    import { twMerge } from 'tailwind-merge';

    const { children, name, icon, class: cls = '' }: { children: Snippet; name: string; icon: BootstrapIcon; class?: string } = $props();

    let myIdentifier = Math.floor(Math.random() * Math.pow(2, 16));
    let opened = $state(false);
</script>

<div class="relative cursor-pointer select-none rounded-md px-2 py-1 text-xl font-bold transition-colors duration-200 hover:bg-primary">
    <div
        role="button"
        onclick={() => (opened = !opened)}
        onkeypress={(ev) => ev.key === 'Enter' && (opened = !opened)}
        tabindex={0}
        class="flex gap-1 drop-down-toggle-{myIdentifier}"
    >
        <Icon name={icon} />
        {name}
        <Icon name={opened ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} />
    </div>
    {#if opened}
        <ClickOutside
            class={twMerge('absolute left-0 top-[105%] w-full rounded-md bg-primary p-2', cls)}
            ignoredClasses={[`drop-down-toggle-${myIdentifier}`]}
            clickoutside={() => (opened = false)}
        >
            {@render children()}
        </ClickOutside>
    {/if}
</div>
