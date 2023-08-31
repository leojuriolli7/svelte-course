import { writable } from "svelte/store";

const settings = writable(
  {
    // default values:
    colorScheme: "dark",
    language: "en",
    fontSize: 12,
  },
  () => {
    console.log("from 0 to 1");

    return () => {
      console.log("from 1 to 0");
    };
  }
);

export default settings;
