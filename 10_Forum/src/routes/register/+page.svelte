<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';
</script>

<Card class="m-auto grid min-w-[50%] grid-cols-2 gap-2 p-8">
    <h1 class="col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black font-poppins text-2xl font-bold lg:text-4xl">Register</h1>
    <Entry id="username" label="Username">
        <Input id="username" />
    </Entry>
    <Entry id="email" label="Email">
        <Input id="email" type="email" />
    </Entry>
    <Entry id="password" label="Password">
        <Input id="password" type="password" />
    </Entry>
    <Entry id="password2" label="Password (again)">
        <Input id="password2" type="password" />
    </Entry>
    <Button class="col-span-2 mx-auto">Register</Button>
</Card>
