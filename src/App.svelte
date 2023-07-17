<script>
  import TodoPage from "./lib/TodoPage.svelte";
  import longpress from "./lib/actions/long-press";

  let duration = 1000;
  let showButton = true;
</script>

<div>
  <label>
    <input type="checkbox" bind:checked={showButton} />
    Toggle
  </label>

  <input
    type="range"
    min={1000}
    max={10000}
    step={100}
    style:width="200px"
    style:margin-bottom="20px"
    bind:value={duration}
  />

  {#if showButton}
    <button
      style:margin-bottom="20px"
      on:longpress={() => console.log("long pressed")}
      use:longpress={{
        duration,
      }}>Long press me</button
    >
  {/if}
</div>

<!-- <TodoPage /> -->

<style></style>
