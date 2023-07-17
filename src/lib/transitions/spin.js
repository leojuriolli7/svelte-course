import { cubicInOut } from "svelte/easing";

export default function spin(
  /** DOM node to apply animation */
  node,
  {
    delay = 0,
    duration = 400,
    easing = cubicInOut,
    /** Number of rotations around itself */
    spin = 1,
  }
) {
  return {
    delay,
    duration,
    easing,
    /**
     *
     * @param {number} t Value 0 to 1 which represents the time of the animation after the easing function is applied.
     * "in" transitions: goes from 0 to 1;
     * "out" transitions: goes from 1 to 0;
     *
     * @param {number} u Value of 1-t;
     *
     * @returns CSS string.
     */
    css: (t, u) => {
      const originalOpacity = Number(getComputedStyle(node).opacity);
      const originalTransform = getComputedStyle(node).transform.replace(
        "none",
        ""
      );

      return `
        opacity: ${t * originalOpacity};
        transform: ${originalTransform} scale(${t}) rotate(${
        spin * 360 * t
      }deg);
      `;
    },
  };
}
