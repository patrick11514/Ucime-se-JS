<script lang="ts">
    import Navigation from '$/components/Navigation/Navigation.svelte';
    import { onMount, type Snippet } from 'svelte';

    import '../app.css';
    import 'bootstrap-icons/font/bootstrap-icons.min.css';
    import type { LayoutData } from './$types';
    import { API } from '$/lib/api';
    import { getState, setState } from '$/lib/state.svelte';

    let { children, data }: { children: Snippet; data: LayoutData } = $props();

    API.hydrateFromServer(data.api);
    setState({ ...data.userState, ...data.permissions });

    const _state = getState();

    onMount(() => {
        const interval = setInterval(
            async () => {
                const response = await API.permissions();
                if (!response.status) {
                    _state.userState = {
                        logged: false
                    };
                    return;
                }

                _state.userState = { logged: true, data: response.data };
            },
            5 * 60 * 1000
        );

        return () => {
            clearInterval(interval);
        };
    });
</script>

<main class="flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background font-roboto text-text lg:text-lg">
    <Navigation />
    <section class="flex h-full flex-1 flex-col items-center justify-center">
        {@render children()}
    </section>
</main>
