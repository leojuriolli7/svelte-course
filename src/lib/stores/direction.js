import { derived } from "svelte/store";
import settings from "./settings";

// track website direction
const direction = derived(
  settings,
  ($settings, set) => {
    const timer = setTimeout(() => {
      set($settings.language === "ar" ? "rtl" : "ltr");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  },
  "not decided"
);

export default direction;
