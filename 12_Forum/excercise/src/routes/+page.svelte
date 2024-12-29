<script>
    import { getState } from '$/lib/state.svelte';

    const userState = getState();
</script>

{JSON.stringify(userState.userState)}

<h1 class="text-">Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
