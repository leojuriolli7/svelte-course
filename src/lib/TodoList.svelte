<svelte:options immutable={true} />

<script>
  import Button from "./Button.svelte";
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";
  import { createEventDispatcher, afterUpdate } from "svelte";
  import { scale, crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  const [send, receive] = crossfade({
    duration: 400,
    fallback(node) {
      return scale(node, {
        start: 0.5,
        duration: 300,
      });
    },
  });

  export let todos = null;
  export let error = null;
  export let loading = true;
  export let success = false;
  export let disabled = false;
  export let disabledItems = [];
  export let scrollOnAdd = undefined;

  $: done = todos ? todos.filter((t) => t.completed === true) : [];
  $: todo = todos ? todos.filter((t) => t.completed === false) : [];

  let prevTodos = todos;
  let listContainer, listContainerScrollHeight, inputValue, input, autoscroll;

  // used to dispatch custom events we can listen to.
  const dispatch = createEventDispatcher();

  $: {
    // when todos change, we check if there is a new todo
    // and allow autoscroll.
    autoscroll = todos && prevTodos && todos.length > prevTodos?.length;

    // after checking for autoscroll, we update prevTodos.
    prevTodos = todos;
  }

  afterUpdate(() => {
    let pos;
    if (scrollOnAdd === "top") pos = 0;
    if (scrollOnAdd === "bottom") pos = listContainerScrollHeight;

    if (scrollOnAdd) {
      // if autoscroll flag is enabled, we scroll to new item and
      // flag it back to false.
      if (autoscroll) {
        listContainer.scrollTo(0, pos);
        autoscroll = false;
      }
    }
  });

  // readonly prop
  export function clearInput() {
    inputValue = undefined;
  }

  // readonly prop
  export function focusInput() {
    input.focus();
  }

  // dispatch custom event `on:removetodo`
  function handleClickRemove(id) {
    dispatch("removetodo", { id });
  }

  // dispatch custom event `on:updatetodo`
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
  {#if loading}
    <p class="feedback-text">Loading...</p>
  {/if}

  {#if !!error}
    <p class="feedback-text">{error?.message || "An error has occured"}</p>
  {/if}

  {#if success === true}
    <div bind:this={listContainer} class="todo-list">
      <div>
        {#if todos.length === 0}
          <p class="feedback-text">No TO-DOs yet.</p>
        {:else}
          <div style:display="flex">
            {#each [todo, done] as list, index}
              <div class="list-wrapper">
                <h2>{index === 0 ? "TO-DOs" : "Done"}</h2>
                <ul bind:offsetHeight={listContainerScrollHeight}>
                  {#each list as todo, index (todo.id)}
                    {@const { title, id, completed } = todo}
                    <!-- 
              1. animate:flip must be used inside a list with keys
                2. will only trigger animation when list order changes
               -->
                    <li animate:flip={{ duration: 300 }}>
                      <slot {todo} {handleCheckbox}>
                        <div
                          in:receive={{
                            key: id,
                          }}
                          out:send={{
                            key: id,
                          }}
                          class:completed
                        >
                          <label>
                            <input
                              type="checkbox"
                              checked={completed}
                              disabled={disabledItems.includes(id)}
                              on:change={(e) => handleCheckbox(e, id)}
                            />
                            <slot name="title" {index} {title}>{title}</slot>
                          </label>

                          <button
                            class="remove-todo-button"
                            aria-label="Delete {title}"
                            disabled={disabledItems.includes(id)}
                            on:click={() => handleClickRemove(id)}
                          >
                            <span
                              style:width="10px"
                              style:display="inline-block"
                            >
                              <FaRegTrashAlt />
                            </span>
                          </button>
                        </div>
                      </slot>
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <form class="add-todo-form" on:submit|preventDefault={handleSubmit}>
      <input
        placeholder="Write a new TO-DO..."
        bind:this={input}
        type="text"
        bind:value={inputValue}
        disabled={disabled || loading}
      />
      <Button
        class="add-todo-button"
        type="submit"
        disabled={!inputValue || disabled || loading}
      >
        Add
      </Button>
    </form>
  {/if}
</div>

<style lang="scss">
  .todo-list-wrapper {
    background-color: #424242;
    border: 1px solid #4b4b4b;

    .completed > label {
      opacity: 0.5;
      text-decoration: line-through;
    }

    .todo-list {
      max-height: 400px;
      overflow: auto;

      .list-wrapper {
        padding: 10px;
        flex: 1;

        h2 {
          margin: 0 0 10px 0;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;

          li > div {
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            background-color: #303030;
            border-radius: 5px;
            padding: 10px;
            position: relative;

            &:hover {
              .remove-todo-button {
                display: block;
              }
            }

            label {
              cursor: pointer;
              user-select: none;
              font-size: 18px;
              display: flex;
              align-items: baseline;
              padding-right: 20px;

              input[type="checkbox"] {
                margin: 0 10px 0 0;
                cursor: pointer;

                &:disabled {
                  cursor: not-allowed;
                }
              }
            }

            .remove-todo-button {
              border: none;
              background: #7f1d1d;
              border-radius: 3px;
              box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
                0 1px 2px -1px rgb(0 0 0 / 0.1);
              position: absolute;
              right: 5px;
              width: 25px;
              height: 25px;
              cursor: pointer;
              display: none;

              &:disabled {
                opacity: 0.4;
                cursor: not-allowed;
              }

              &:hover {
                background: #7f1d1d90;
              }

              // any svg inside .remove-todo-button,
              // regardless if it is directly inside this component,
              // or in another. (Icon library)
              :global(svg) {
                fill: #fef2f2;
              }
            }
          }
        }
      }
    }

    .feedback-text {
      margin: 0;
      padding: 15px;
      text-align: center;
    }
  }

  .add-todo-form {
    padding: 15px;
    background-color: #303030;
    display: flex;
    border-top: 1px solid #4b4b4b;
    gap: 5px;

    input {
      flex: 1;
      background-color: #424242;
      border: 1px solid #4b4b4b;
      border-radius: 5px;
      padding: 10px;
      color: #fff;
    }

    // any `.add-todo-button` component inside
    // this component.
    :global(.add-todo-button) {
      background-color: aqua;
      width: 60px;
      height: 45px;
    }
  }
</style>
