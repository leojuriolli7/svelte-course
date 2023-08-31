<script>
  import { cubicInOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  const size = tweened(
    { width: 100, height: 100 },
    { duration: 200, easing: cubicInOut }
  );
</script>

<button
  on:click={async () => {
    // if animation is interrupted, this never resolves.
    await size.set({
      width: Math.random() * 500,
      height: Math.random() * 500,
    });

    console.log("set is done");
  }}>Randomize size</button
>

<div
  style="background-color: purple; width: {$size.width}px; height: {$size.height}px"
/>
