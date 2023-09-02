<script>
  import Stage from "../konva/Stage.svelte";
  import Layer from "../konva/Layer.svelte";
  import Rect from "../konva/Rect.svelte";

  let layerX = 20;
  let width = 300;
  let rect1, rect2;
</script>

<button
  on:click={() => console.log(rect1.rect.getAttrs(), rect2.rect.getAttrs())}
  >Get Rect Info</button
>

<label>
  <input type="range" bind:value={layerX} min={0} max={300} />
  Layer X
</label>

<br />

<label>
  <input type="range" bind:value={width} min={0} max={1000} />
  Stage width
</label>

<Stage {width} height={400}>
  <Layer
    x={layerX}
    draggable
    on:click={(e) => console.log("click")}
    on:dragmove={(e) => console.log(e.detail)}
  >
    <Rect
      x={20}
      y={20}
      fill="purple"
      stroke="red"
      bind:this={rect1}
      width={40}
      height={50}
      strokeWidth={4}
      on:click={(e) => console.log("clicked rect", console.log(e.detail))}
    />
    <Rect x={50} y={50} fill="green" width={100} height={100} />
  </Layer>
  <Layer>
    <Rect
      bind:this={rect2}
      x={60}
      y={100}
      fill="aqua"
      stroke="blue"
      width={100}
      height={20}
      strokeWidth={2}
    />
  </Layer>
</Stage>
