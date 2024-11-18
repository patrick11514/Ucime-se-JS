<script lang="ts">
    import '../app.css';
    let { children } = $props();
</script>

<main class="bg-background text-text flex h-full min-h-screen w-full flex-col overflow-x-hidden">
    {@render children()}
</main>
