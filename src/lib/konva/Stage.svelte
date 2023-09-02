<script>
  import Konva from "konva";
  import { onDestroy, onMount, setContext } from "svelte";
  import { stageKey } from "./context-keys";

  export let width;
  export let height;

  let stageContainer;
  let stage;

  setContext(stageKey, {
    // by passing a function instead of
    // the stage directly, we prevent it
    // from returning undefined.
    getStage: () => stage,
  });

  onMount(() => {
    stage = new Konva.Stage({
      container: stageContainer,
      width,
      height,
    });
  });

  $: if (stage) stage.setAttrs({ container: stageContainer, width, height });

  onDestroy(() => {
    if (stage) stage.destroy();
  });
</script>

<div bind:this={stageContainer}>
  <!-- 
    This `if` is because before onMount `stage` is undefined,
    and children calling it would error. 
  -->
  {#if stage}
    <slot />
  {/if}
</div>
