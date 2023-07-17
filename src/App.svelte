<script>
  import TodoPage from "./lib/TodoPage.svelte";
  import longpress from "./lib/actions/long-press";
  import tippy from "./lib/actions/tippy";

  let content = "Initial content";
</script>

<div>
  <input bind:value={content} />
  <button use:tippy={{ content, theme: "light", placement: "right" }}>
    Tooltip
  </button>

  <button
    style:margin-bottom="20px"
    on:longpress={() => console.log("long pressed")}
    use:longpress={{
      duration: 1000,
    }}>Long press me</button
  >
</div>

<!-- <TodoPage /> -->

<style></style>
