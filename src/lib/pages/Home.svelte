<script>
  import VideoPlayer, { pauseAll, playAll } from "../VideoPlayer.svelte";
</script>

<button on:click={playAll}>Play all</button>
<button on:click={pauseAll}>Pause all</button>

<VideoPlayer src="video.mp4" />
<VideoPlayer src="video.mp4" />
<VideoPlayer src="video.mp4" />
