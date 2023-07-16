<script>
  import TodoList from "./lib/TodoList.svelte";
  import { onMount, tick } from "svelte";
  import { v4 as uuid } from "uuid";

  let showList = true;
  let todoList;

  let loading = true;
  let success = false;
  let error = null;
  let todos = null;

  async function loadTodos() {
    loading = true;
    await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
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

    todos = [
      ...todos,
      {
        id: uuid(),
        title: event.detail.title,
        completed: false,
      },
    ];

    await tick();

    // after api call is successfull, we clear the input:
    todoList.clearInput();
    todoList.focusInput();
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
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleDeleteTodo}
      on:updatetodo={handleUpdateTodo}
    />
  </div>
{/if}

<style>
</style>
