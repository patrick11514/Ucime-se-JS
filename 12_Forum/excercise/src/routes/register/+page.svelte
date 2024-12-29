<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';
    import { API } from '$/lib/api';
    import { SwalAlert } from '$/lib/functions';
    import { goto } from '$app/navigation';
    import { extractError, matchError } from '$/lib/errors';
    import { page } from '$app/state';

    const inputs = ['username', 'email', 'password', 'password2'] as const;
    type Data = Record<
        (typeof inputs)[number],
        {
            value: string;
            error?: string;
        }
    >;

    let data = $state(Object.fromEntries(inputs.map((input) => [input, { value: '' }])) as Data);

    const register = async () => {
        Object.values(data).forEach((item) => (item.error = undefined));

        if (!data.username.value) {
            data.username.error = 'Please enter username';
        }
        if (!data.email.value) {
            data.email.error = 'Please enter email';
        }
        if (!data.password.value) {
            data.password.error = 'Please enter password';
        }
        if (!data.password2.value) {
            data.password2.error = 'Please enter password again';
        }
        if (data.password.value != data.password2.value) {
            data.password2.error = "Passwords doesn't match";
        }

        if (Object.values(data).some((item) => item.error !== undefined)) {
            return;
        }

        const response = await API.auth.register({
            username: data.username.value,
            email: data.email.value,
            password: data.password.value
        });

        if (!response.status) {
            SwalAlert({
                icon: 'error',
                title: extractError(response.message)
            });

            if (matchError(response.message, 'auth.register.invalid')) {
                data.username.error = extractError(response.message);
                data.email.error = extractError(response.message);
            }

            return;
        }

        SwalAlert({
            icon: 'success',
            title: 'Registration was successfull'
        });

        if (page.url.searchParams.has('next')) {
            goto(`/login?next=${page.url.searchParams.get('next')}`);
        } else {
            goto('/login');
        }
    };
    console.log(page.url.searchParams);
</script>

<Card class="m-auto grid min-w-[50%] grid-cols-2 gap-2 p-8">
    <h1 class="col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black font-poppins text-2xl font-bold lg:text-4xl">Register</h1>
    <Entry id="username" label="Username" error={data.username.error}>
        <Input id="username" bind:value={data.username.value} invalid={data.username.error} />
    </Entry>
    <Entry id="email" label="Email" error={data.email.error}>
        <Input id="email" type="email" bind:value={data.email.value} invalid={data.email.error} />
    </Entry>
    <Entry id="password" label="Password" error={data.password.error}>
        <Input id="password" type="password" bind:value={data.password.value} invalid={data.password.error} />
    </Entry>
    <Entry id="password2" label="Password (again)" error={data.password2.error}>
        <Input id="password2" type="password" bind:value={data.password2.value} invalid={data.password2.error} />
    </Entry>
    <Button onclick={register} class="col-span-2 mx-auto">Register</Button>
</Card>
