<svelte:options immutable={true} />

<script>
  import Button from "./Button.svelte";
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    afterUpdate,
  } from "svelte";

  export let todos = [];
  let prevTodos = todos;

  let listContainer, listContainerScrollHeight, inputValue, input, autoscroll;

  $: {
    autoscroll = todos.length > prevTodos?.length;

    prevTodos = todos;
  }

  afterUpdate(() => {
    if (autoscroll) {
      listContainer.scrollTo(0, listContainerScrollHeight);
      autoscroll = false;
    }
  });

  export function clearInput() {
    inputValue = undefined;
  }

  export function focusInput() {
    input.focus();
  }

  onMount(() => console.log("Mounted"));
  onDestroy(() => console.log("Destroyed"));

  const dispatch = createEventDispatcher();

  function handleClickRemove(id) {
    dispatch("removetodo", { id });
  }

  function handleCheckbox(e, id) {
    dispatch("updatetodo", {
      value: e.target.checked,
      id,
    });
  }

  function handleSubmit() {
    if (!inputValue) return;

    const isNotCanceled = dispatch(
      "addtodo",
      {
        title: inputValue,
      },
      {
        cancelable: true,
      }
    );

    if (isNotCanceled) {
      inputValue = undefined;
    }
  }
</script>

<div class="todo-list-wrapper">
  <div bind:this={listContainer} class="todo-list">
    <div>
      <ul bind:offsetHeight={listContainerScrollHeight}>
        {#each todos as { title, id, completed } (id)}
          <li>
            <label class:completed>
              <input
                type="checkbox"
                checked={completed}
                on:change={(e) => handleCheckbox(e, id)}
              />
              {title}
            </label>

            <button on:click={() => handleClickRemove(id)}>Delete</button>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <form class="add-todo-form" on:submit|preventDefault={handleSubmit}>
    <input bind:this={input} type="text" bind:value={inputValue} />
    <Button type="submit" disabled={!inputValue}>Add</Button>
  </form>
</div>

<style lang="scss">
  .completed {
    text-decoration: line-through;
  }

  .todo-list {
    max-height: 150px;
    overflow: auto;
  }
</style>
