<script>
  import { onDestroy } from "svelte";
  import settings from "../stores/settings";

  let colorScheme;
  const unsub = settings.subscribe((values) => {
    colorScheme = values.colorScheme;
  });

  $: {
    settings.update((prev) => ({ ...prev, colorScheme }));
  }

  onDestroy(() => unsub());
</script>

<h2>Settings</h2>

<label>
  <input
    bind:group={colorScheme}
    value="dark"
    type="radio"
    name="colorScheme"
  />
  Dark
</label>
<label>
  <input
    bind:group={colorScheme}
    value="light"
    type="radio"
    name="colorScheme"
  />
  Light
</label>
