<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';
</script>

<Card class="m-auto flex min-w-[50%] flex-col gap-2 p-8">
    <h1 class=" mx-auto mb-4 w-max border-b-2 border-b-black font-poppins text-2xl font-bold lg:text-4xl">Login</h1>
    <Entry id="username" label="Username">
        <Input id="username" />
    </Entry>
    <Entry id="password" label="Password">
        <Input id="password" type="password" />
    </Entry>
    <Button class="col-span-2 mx-auto">Login</Button>
</Card>
