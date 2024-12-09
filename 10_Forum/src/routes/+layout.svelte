<script lang="ts">
    import '../app.css';
    let { children } = $props();
</script>

<main class="h-full min-h-screen w-full overflow-x-hidden bg-background text-text lg:text-lg">
    {@render children()}
</main>
