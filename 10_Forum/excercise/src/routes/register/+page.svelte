<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';
    import Swal from 'sweetalert2';
    import { API } from '$/lib/api';
    import { SwalAlert } from '$/lib/functions';
    import { goto } from '$app/navigation';

    type Inputs = 'username' | 'email' | 'password' | 'password2';

    let data = $state<
        Record<
            Inputs,
            {
                value: string;
                error?: string;
            }
        >
    >({
        username: {
            value: '',
            error: undefined
        },
        email: {
            value: '',
            error: undefined
        },
        password: {
            value: '',
            error: undefined
        },
        password2: {
            value: '',
            error: undefined
        }
    });

    const getValues = () => {
        return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.value])) as Record<Inputs, string>;
    };

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

        const response = await API.auth.register(getValues());

        if (!response.status) {
            SwalAlert({
                icon: 'error',
                title: response.message
            });
            return;
        }

        SwalAlert({
            icon: 'success',
            title: 'Registration was successfull'
        });

        goto('/login');
    };
</script>

<Card class="m-auto grid min-w-[50%] grid-cols-2 gap-2 p-8">
    <h1 class="col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black font-poppins text-2xl font-bold lg:text-4xl">Register</h1>
    <Entry id="username" label="Username" error={data.username.error}>
        <Input id="username" bind:value={data.username.value} />
    </Entry>
    <Entry id="email" label="Email" error={data.email.error}>
        <Input id="email" type="email" bind:value={data.email.value} />
    </Entry>
    <Entry id="password" label="Password" error={data.password.error}>
        <Input id="password" type="password" bind:value={data.password.value} />
    </Entry>
    <Entry id="password2" label="Password (again)" error={data.password2.error}>
        <Input id="password2" type="password" bind:value={data.password2.value} />
    </Entry>
    <Button onclick={register} class="col-span-2 mx-auto">Register</Button>
</Card>
