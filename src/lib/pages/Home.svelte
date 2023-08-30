<script>
  import { onDestroy } from "svelte";
  import settings from "../stores/settings";

  let colorScheme;
  const unsub = settings.subscribe((values) => {
    colorScheme = values.colorScheme;
  });

  onDestroy(() => unsub());
</script>

<h2>Home</h2>
{colorScheme}
