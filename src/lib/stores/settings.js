import { writable } from "svelte/store";

const settings = writable({
  // default values:
  colorScheme: "dark",
  language: "en",
  fontSize: 12,
});

export default settings;
