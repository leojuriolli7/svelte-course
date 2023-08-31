<script>
  import settings from "../stores/settings";
</script>

<h2>Settings</h2>

<p>{$settings.language}</p>

<button
  on:click={() => {
    settings.updateSetting("language", Math.random());
  }}>Update language</button
>

<button
  on:click={() => {
    settings.toggleColorScheme();
  }}>Toggle color scheme</button
>

<br />

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

<button
  on:click={() => {
    settings.reset();
  }}>Reset settings</button
>
