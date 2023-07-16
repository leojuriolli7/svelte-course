<script>
  import TodoList from "./lib/TodoList.svelte";
  import { tick } from "svelte";
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
    {
      id: uuid(),
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue lacus sit amet diam consectetur, ut ultricies enim commodo. Ut a molestie mi. Pellentesque eleifend quam ac tincidunt pharetra.",
      completed: true,
    },
  ];

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
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleDeleteTodo}
      on:updatetodo={handleUpdateTodo}
    />
  </div>
{/if}

<style>
</style>
