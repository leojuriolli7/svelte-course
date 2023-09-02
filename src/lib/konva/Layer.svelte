<script>
  import Konva from "konva";
  import {
    createEventDispatcher,
    getContext,
    onDestroy,
    setContext,
  } from "svelte";
  import { layerKey, stageKey } from "./context-keys";

  export let draggable = undefined;
  export let x = undefined;
  export let y = undefined;

  const { getStage } = getContext(stageKey);
  const stage = getStage();
  const dispatch = createEventDispatcher();

  const layer = new Konva.Layer({
    draggable,
    x,
    y,
  });

  // layer will never be undefined, so we can pass it directly here.
  setContext(layerKey, layer);

  stage.add(layer);

  $: layer.setAttrs({ draggable, x, y });

  // konva accepts listening to many events
  layer.on("dragmove click", (e) => {
    // dispatch a custom events for the component to access
    dispatch(e.type, e);
  });

  onDestroy(() => {
    layer.destroy();
  });
</script>

<slot />
