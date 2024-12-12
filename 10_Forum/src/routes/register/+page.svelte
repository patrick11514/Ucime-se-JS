<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';

    let data = $state<
        Record<
            string,
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

    const register = async () => {
        //At the start remove all errors
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
            data.password2.error = 'Please enter password';
        }
        if (data.password.value != data.password2.value) {
            data.password2.error = "Password doesn't match";
        }

        //check if some errors
        if (Object.values(data).some((item) => item.error !== undefined)) {
            return;
        }

        const response = await API.auth.register(Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.value])));
        console.log(response);
    };
</script>

<Card class="m-auto grid min-w-[50%] grid-cols-2 gap-2 p-8">
    <h1 class="col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black font-poppins text-2xl font-bold lg:text-4xl">Register</h1>
    <Entry id="username" label="Username">
        <Input id="username" bind:value={data.username.value} />
    </Entry>
    <Entry id="email" label="Email">
        <Input id="email" type="email" bind:value={data.email.value} />
    </Entry>
    <Entry id="password" label="Password">
        <Input id="password" type="password" bind:value={data.password.value} />
    </Entry>
    <Entry id="password2" label="Password (again)">
        <Input id="password2" type="password" bind:value={data.password2.value} />
    </Entry>
    <Button onclick={register} class="col-span-2 mx-auto">Register</Button>
</Card>
