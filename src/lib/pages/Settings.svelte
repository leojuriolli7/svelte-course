<script>
  import settings from "../stores/settings";
</script>

<h2>Settings</h2>

<button
  on:click={() => {
    $settings.colorScheme =
      $settings.colorScheme === "light" ? "dark" : "light";
  }}>Toggle color scheme</button
>

<label>
  <input
    bind:group={$settings.colorScheme}
    value="dark"
    type="radio"
    name="colorScheme"
  />
  Dark
</label>
<label>
  <input
    bind:group={$settings.colorScheme}
    value="light"
    type="radio"
    name="colorScheme"
  />
  Light
</label>
