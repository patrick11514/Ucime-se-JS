<script lang="ts">
    import Navigation from '$/components/Navigation/Navigation.svelte';

    import '../app.css';
    import 'bootstrap-icons/font/bootstrap-icons.min.css';

    let { children } = $props();
</script>

<main class="flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background font-roboto text-text lg:text-lg">
    <Navigation />
    <section class="flex h-full flex-1 flex-col items-center justify-center">
        {@render children()}
    </section>
</main>
