import { readable } from "svelte/store";

// null because the initial value is null
// (we dont know the user's location yet)
const location = readable(null, (set) => {
  // this callback runs when the store is first subscribed to.

  let watchId;

  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        set({ latitude, longitude });
      },
      (error) => {
        set({ error });
      }
    );
  }

  // return callback runs when store goes to 0 subscribers.
  return () => {
    navigator.geolocation.clearWatch(watchId);
    set(null);
  };
});

export default location;
