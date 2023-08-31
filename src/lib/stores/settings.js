import { writable } from "svelte/store";

function createSettingsStore() {
  const defaults = {
    colorScheme: "dark",
    language: "en",
    fontSize: 12,
  };

  // by passing {...defaults} we create a new object instead of passing
  // the defaults object and allowing it to be mutated.
  const { subscribe, set, update } = writable({ ...defaults });

  // only required method to be returned is `subscribe`
  return {
    subscribe,
    set,
    update,
    reset: () => {
      set({ ...defaults });
    },
    updateSetting: (key, value) => {
      update((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    toggleColorScheme: () => {
      update((prev) => ({
        ...prev,
        colorScheme: prev.colorScheme === "light" ? "dark" : "light",
      }));
    },
  };
}

export default createSettingsStore();
