<script lang="ts">
    import type { Snippet } from 'svelte';

    /**
     * Source: https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
     */
    function clickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target) return;

            if (node && !node.contains(target) && !event.defaultPrevented && !ignoredElements.includes(target) && !ignoredClasses.some((cls) => target.classList.contains(cls))) {
                clickoutside();
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }

    const {
        children,
        class: cls = '',
        clickoutside,
        ignoredElements = [],
        ignoredClasses = []
    }: {
        children: Snippet;
        class?: string;
        clickoutside: () => void;
        ignoredElements?: HTMLElement[];
        ignoredClasses?: string[];
    } = $props();
</script>

<div class={cls} use:clickOutside>{@render children()}</div>
