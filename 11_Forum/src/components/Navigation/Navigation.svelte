<script lang="ts">
    import type { BootstrapIcon } from '$/types/bootstrap_icons';
    import Button from '../Form/Button.svelte';
    import Icon from '../Icon.svelte';
    import Dropdown from './Dropdown.svelte';

    const dropdowns: {
        name: string;
        icon: BootstrapIcon;
    }[] = [
        {
            name: 'Forums',
            icon: 'bi-journal-text'
        },
        {
            name: 'Categories',
            icon: 'bi-list-ul'
        },
        {
            name: 'Users',
            icon: 'bi-people-fill'
        }
    ];

    let logged = true;
</script>

<nav class="grid grid-cols-nav gap-4 bg-secondary px-2 py-4 md:px-8">
    <a href="/" class="font-poppins text-3xl font-bold text-primary lg:text-5xl">MdFor</a>
    <div class="flex items-center gap-4">
        {#each dropdowns as dropdown}
            <Dropdown name={dropdown.name} icon={dropdown.icon}>DROP CONTENT</Dropdown>
        {/each}
    </div>
    <div class="flex items-center justify-end gap-2">
        {#if !logged}
            <a href="/register" class="flex gap-1 rounded-md px-2 py-1 text-xl font-bold transition-colors duration-200 hover:bg-primary">
                <Icon name="bi-person-add" />
                Register
            </a>
            <a href="/login" class="flex gap-1 rounded-md px-2 py-1 text-xl font-bold transition-colors duration-200 hover:bg-primary">
                <Icon name="bi-person-add" />
                Login
            </a>
        {:else}
            <Dropdown name="patrick115" icon="bi-person-fill" class="left-1/2 flex min-w-56 -translate-x-1/2 flex-col">
                Tady budou potom staty uživatele
                <Button>Logout</Button>
            </Dropdown>
        {/if}
    </div>
</nav>
