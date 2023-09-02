<script context="module">
  let allVideos = new Set();

  export function playAll() {
    allVideos.forEach((video) => {
      video.play();
    });
  }

  export function pauseAll() {
    allVideos.forEach((video) => {
      video.pause();
    });
  }
</script>

<script>
  import { onDestroy, onMount } from "svelte";

  export let src;

  let video;
  let paused = true;

  onMount(() => {
    allVideos.add(video);
  });

  onDestroy(() => {
    allVideos.delete(video);
  });
</script>

<video
  {src}
  controls
  muted
  class:playing={!paused}
  bind:this={video}
  bind:paused
  style:width="300px"
  style:height="300px"
/>

<style>
  .playing {
    outline: 4px solid #ff3e00;
  }
</style>
