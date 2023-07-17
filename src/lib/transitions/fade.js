/**
 * Example of a fade transition
 * using Javascript.
 */

import { cubicInOut } from "svelte/easing";

export default function fade(
  node,
  { delay = 0, duration = 400, easing = cubicInOut }
) {
  const originalOpacity = Number(getComputedStyle(node).opacity);

  return {
    delay,
    duration,
    easing,
    /** Function will run on every point in time of the transition */
    tick: (t, u) => {
      node.style.opacity = t * originalOpacity;
    },
  };
}
