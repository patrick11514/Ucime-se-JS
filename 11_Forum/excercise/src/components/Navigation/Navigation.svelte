<script lang="ts">
    import type { BootstrapIcon } from '$/types/bootstrap_icons';
    import { getContext } from 'svelte';
    import Button from '../Form/Button.svelte';
    import Icon from '../Icon.svelte';
    import Dropdown from './Dropdown.svelte';
    import type { UserState } from '$/types/types';
    import type { Writable } from 'svelte/store';
    import { API } from '$/lib/api';
    import { getUserState, SwalAlert } from '$/lib/functions';

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

    const userState = getUserState();

    const logout = async () => {
        const response = await API.auth.logout();
        if (!response.status) {
            SwalAlert({
                icon: 'error',
                title: 'Unable to logout, please try again later'
            });
            return;
        }

        SwalAlert({
            icon: 'success',
            title: 'Successfully logged out'
        });

        userState.set({
            logged: false
        });
    };
</script>

<nav class="grid grid-cols-nav gap-4 bg-secondary px-2 py-4 md:px-8">
    <a href="/" class="font-poppins text-3xl font-bold text-primary lg:text-5xl">MdFor</a>
    <div class="flex items-center gap-4">
        {#each dropdowns as dropdown}
            <Dropdown name={dropdown.name} icon={dropdown.icon}>DROP CONTENT</Dropdown>
        {/each}
    </div>
    <div class="flex items-center justify-end gap-2">
        {#if !$userState.logged}
            <a href="/register" class="flex gap-1 rounded-md px-2 py-1 text-xl font-bold transition-colors duration-200 hover:bg-primary">
                <Icon name="bi-person-add" />
                Register
            </a>
            <a href="/login" class="flex gap-1 rounded-md px-2 py-1 text-xl font-bold transition-colors duration-200 hover:bg-primary">
                <Icon name="bi-person-add" />
                Login
            </a>
        {:else}
            <Dropdown name={$userState.data.username} icon="bi-person-fill" class="left-1/2 flex min-w-56 -translate-x-1/2 flex-col">
                Tady budou potom staty uživatele
                <Button onclick={logout}>Logout</Button>
            </Dropdown>
        {/if}
    </div>
</nav>
