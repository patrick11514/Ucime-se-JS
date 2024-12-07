<script lang="ts">
    let data = $state<string[]>([]);

    let value = $state('');

    const add = () => {
        data.push(value);
        value = '';
    };
</script>

<main>
    <h1>Todo List</h1>
    <div class="horizontal">
        <input type="text" bind:value placeholder="Enter new task" />
        <button onclick={add}>Add Task</button>
    </div>

    <h2>Task list</h2>
    <div id="tasks" class="vertical">
        {#if data.length == 0}
            <p>No items found</p>
        {:else}
            {#each data as item, index}
                <div class="item">
                    <h4>{item}</h4>
                    <button onclick={() => (data = data.filter((_, i) => i != index))}>X</button>
                </div>
            {/each}
        {/if}
    </div>
</main>

<style>
    :root {
        --primary: #dc7f14;
        --primary-darker: #ff8800;
        --secondary: #151313;
        --background: #282525;
    }

    :global(html),
    :global(body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border: white 2px solid;
        border-radius: 0.5rem;

        width: max(12rem, 50%);
        padding: 0.25rem;

        color: white;
        background-color: var(--secondary);

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            color: var(--primary);
            text-align: center;
        }

        .horizontal {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }

        .vertical {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.5rem;
            align-items: center;
        }

        .item {
            width: max(12rem, 50%);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            h4 {
                margin: 0;
                color: white;
                text-align: left;
            }

            button {
                color: red;
                font-weight: bolder;
                font-size: x-large;
                padding: 0.5;
                border: none;
                background: transparent;
                cursor: pointer;
            }
        }

        input {
            width: max(8rem, 50%);
            font-family: 'Roboto', sans-serif;
            background: transparent;
            outline: none;
            border: none;
            border-bottom: solid 1px white;
            color: white;
            font-size: larger;
        }

        button {
            transition: all;
            transition-duration: 0.2s;

            background-color: var(--primary);
            border: white 2px solid;
            padding: 0.25rem 0.5rem;
            font: inherit;
            border-radius: 0.5rem;
            cursor: pointer;
            color: white;

            &:hover {
                background-color: var(--primary-darker);
                transform: translate(0, 2px);
            }

            &:active {
                scale: 0.95;
            }
        }
    }
</style>
