<script lang="ts">
    import Navigation from '$/components/Navigation/Navigation.svelte';
    import type { Snippet } from 'svelte';

    import '../app.css';
    import 'bootstrap-icons/font/bootstrap-icons.min.css';
    import type { LayoutData } from './$types';
    import { API } from '$/lib/api';
    import { setUserState } from '$/lib/functions';

    let { children, data }: { children: Snippet; data: LayoutData } = $props();

    API.hydrateFromServer(data.api);
    setUserState(data.userState);
</script>

<main class="flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background font-roboto text-text lg:text-lg">
    <Navigation />
    <section class="flex h-full flex-1 flex-col items-center justify-center">
        {@render children()}
    </section>
</main>
