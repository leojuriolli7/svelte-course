<script>
  import { cubicInOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { interpolateRgb } from "d3-interpolate";

  const boxProps = tweened(
    { width: 100, height: 100, color: "purple" },
    {
      duration: 200,
      easing: cubicInOut,
      interpolate: (old, final) => {
        return (time) => {
          const deltaWidth = final.width - old.width;
          const deltaHeight = final.height - old.height;
          const color = interpolateRgb(old.color, final.color)(time);

          return {
            width: old.width + deltaWidth * time,
            height: old.height + deltaHeight * time,
            color,
          };
        };
      },
    }
  );
</script>

<button
  on:click={async () => {
    // if animation is interrupted, this never resolves.
    await boxProps.set(
      {
        width: Math.random() * 500,
        height: Math.random() * 500,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      }
      // can override config inside the set:
      // { duration: 4000 }
    );

    console.log("set is done");
  }}>Randomize</button
>

<div
  style="background-color: {$boxProps.color}; width: {$boxProps.width}px; height: {$boxProps.height}px"
/>
