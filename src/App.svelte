<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";

  let showList = true;
  let todoList;

  let todos = [
    {
      id: uuid(),
      title: "Pay taxes",
      completed: true,
    },
    {
      id: uuid(),
      title: "Study",
      completed: false,
    },
    {
      id: uuid(),
      title: "Go to the gym",
      completed: true,
    },
  ];

  function handleAddTodo(event) {
    event.preventDefault();

    todos = [
      ...todos,
      {
        id: uuid(),
        title: event.detail.title,
        completed: false,
      },
    ];

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

<button on:click={() => (showList = !showList)}>
  {showList ? "Hide" : "Show"} list
</button>

{#if showList === true}
  <div style:max-width="200px">
    <TodoList
      {todos}
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleDeleteTodo}
      on:updatetodo={handleUpdateTodo}
    />
  </div>
{/if}

<style>
</style>
