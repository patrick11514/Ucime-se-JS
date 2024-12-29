<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';
    import { API } from '$/lib/api';
    import { getUserState, SwalAlert } from '$/lib/functions';
    import { goto } from '$app/navigation';
    import { extractError, matchError } from '$/lib/errors';
    import { page } from '$app/state';

    const inputs = ['username', 'password'] as const;
    type Data = Record<
        (typeof inputs)[number],
        {
            value: string;
            error?: string;
        }
    >;

    const userState = getUserState();

    let data = $state(Object.fromEntries(inputs.map((input) => [input, { value: '' }])) as Data);

    const login = async () => {
        Object.values(data).forEach((item) => (item.error = undefined));

        if (!data.username.value) {
            data.username.error = 'Please enter username';
        }
        if (!data.password.value) {
            data.password.error = 'Please enter password';
        }
        if (Object.values(data).some((item) => item.error !== undefined)) {
            return;
        }

        const response = await API.auth.login({
            username: data.username.value,
            password: data.password.value
        });

        if (!response.status) {
            SwalAlert({
                icon: 'error',
                title: extractError(response.message)
            });

            if (matchError(response.message, 'auth.login.username')) {
                data.username.error = extractError(response.message);
            } else if (matchError(response.message, 'auth.login.password')) {
                data.password.error = extractError(response.message);
            }

            return;
        }

        SwalAlert({
            icon: 'success',
            title: 'Login was successfull'
        });

        userState.set({
            logged: true,
            data: response.data
        });

        if (page.url.searchParams.has('next')) {
            goto(page.url.searchParams.get('next')!);
        } else {
            goto('/');
        }
    };
</script>

<Card class="m-auto flex min-w-[50%] flex-col gap-2 p-8">
    <h1 class=" mx-auto mb-4 w-max border-b-2 border-b-black font-poppins text-2xl font-bold lg:text-4xl">Login</h1>
    <Entry id="username" label="Username" error={data.username.error}>
        <Input id="username" bind:value={data.username.value} bind:invalid={data.username.error} />
    </Entry>
    <Entry id="password" label="Password" error={data.password.error}>
        <Input id="password" type="password" bind:value={data.password.value} bind:invalid={data.password.error} />
    </Entry>
    <Button onclick={login} class="col-span-2 mx-auto">Login</Button>
</Card>
