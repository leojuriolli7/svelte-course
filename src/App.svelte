<script>
  import TodoList from "./lib/TodoList.svelte";
  import { onMount, tick } from "svelte";
  import { v4 as uuid } from "uuid";

  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  let showList = true;
  let todoList;

  let loading = true;
  let success = false;
  let isAdding = false;
  let error = null;
  let todos = null;

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
            ...todos,
            {
              completed: todo.completed,
              title: todo.title,

              // because it is a fake API, the ids
              // will always be the same. so need to
              // override.
              id: uuid(),
            },
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

  function handleDeleteTodo(e) {
    todos = todos.filter((todo) => todo.id !== e.detail.id);
  }

  function handleUpdateTodo(e) {
    todos = todos.map((todo) => {
      if (todo.id === e.detail.id) {
        return {
          ...todo,
          completed: e.detail.value,
        };
      }

      return todo;
    });
  }
</script>

<button style:margin-bottom="10px" on:click={() => (showList = !showList)}>
  {showList ? "Hide" : "Show"} list
</button>

{#if showList === true}
  <div style:max-width="400px">
    <TodoList
      {todos}
      {loading}
      {error}
      {success}
      disabled={isAdding}
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleDeleteTodo}
      on:updatetodo={handleUpdateTodo}
    />
  </div>
{/if}

<style>
</style>
