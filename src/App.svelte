<script>
  import TodoList from "./lib/TodoList.svelte";
  import { onMount, tick } from "svelte";
  import { fly } from "svelte/transition";
  import { v4 as uuid } from "uuid";
  import spin from "./lib/transitions/spin";

  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  let showList = true;
  let todoList;

  let loading = true;
  let success = false;
  let isAdding = false;
  let error = null;
  let todos = null;
  let disabledItems = [];

  async function loadTodos() {
    loading = true;
    await fetch(`${API_URL}?_limit=10`)
      .then(async (res) => {
        if (res.ok) {
          todos = await res.json();
          success = true;
        } else {
          throw new Error("An error has occured.");
        }
      })
      .catch((e) => {
        error = e;
      })
      .finally(() => {
        loading = false;
      });
  }

  onMount(() => loadTodos());

  async function handleAddTodo(event) {
    event.preventDefault();
    isAdding = true;

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        title: event.detail.title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const todo = await res.json();

          todos = [
            {
              completed: todo.completed,
              title: todo.title,

              // because it is a fake API, the ids
              // will always be the same. so need to
              // override.
              id: uuid(),
            },
            ...todos,
          ];

          // if api call is successfull, we clear the input:
          todoList.clearInput();
        } else {
          alert("An error has occurred");
        }
      })
      .catch((e) => {
        alert(e.message || "An error has occurred");
      })
      .finally(async () => {
        isAdding = false;

        // wait for `isAdding = false` to re-enable input in the DOM.
        await tick();
        todoList.focusInput();
      });
  }

  async function handleDeleteTodo(e) {
    const id = e.detail.id;

    if (disabledItems.includes(id)) return;

    disabledItems = [...disabledItems, id];
    await fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          todos = todos.filter((todo) => todo.id !== e.detail.id);
        } else {
          alert("An error has occurred");
        }
      })
      .catch((e) => {
        alert(e.message || "An error has occurred");
      })
      .finally(() => {
        disabledItems = disabledItems.filter((i) => i !== id);
      });
  }

  async function handleUpdateTodo(e) {
    const id = e.detail.id;
    const value = e.detail.value;

    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];

    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: value,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const updatedTodo = await res.json();

          todos = todos.map((todo) => {
            if (todo.id === id) {
              return updatedTodo;
            }

            return { ...todo };
          });
        } else {
          alert("An error has occurred");
        }
      })
      .catch((e) => {
        alert(e.message || "An error has occurred");
      })
      .finally(() => {
        disabledItems = disabledItems.filter((i) => i !== id);
      });
  }
</script>

<button style:margin-bottom="10px" on:click={() => (showList = !showList)}>
  {showList ? "Hide" : "Show"} list
</button>

{#if showList === true}
  <div transition:spin style:max-width="400px">
    <TodoList
      {todos}
      {loading}
      {error}
      {success}
      {disabledItems}
      disabled={isAdding}
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleDeleteTodo}
      on:updatetodo={handleUpdateTodo}
      scrollOnAdd="top"
      let:todo
      let:handleCheckbox
    >
      <!-- {@const { id, completed, title } = todo}
      <div>
        <input
          type="checkbox"
          checked={completed}
          disabled={disabledItems.includes(id)}
          on:change={(e) => handleCheckbox(e, id)}
        />
        {title}
      </div> -->

      <!-- <svelte:fragment slot="title" let:title let:index>
        {index + 1} - {title}
      </svelte:fragment> -->
    </TodoList>
  </div>

  {#if todos}
    <p>
      Number of todos:
      {#key todos.length}
        <span
          style:display="inline-block"
          in:fly={{
            y: -10,
          }}
        >
          {todos.length}
        </span>
      {/key}
    </p>
  {/if}
{/if}

<style>
</style>
