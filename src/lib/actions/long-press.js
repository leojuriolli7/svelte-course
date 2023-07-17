// this function will run when the element is first mounted.
export default function longpress(node, options) {
  let timer;

  function handleMouseDown() {
    // we deestructure it down here so it is
    // recalculated when options is changed (reassigned below)
    const { duration = 2000 } = options;

    timer = setTimeout(() => {
      node.dispatchEvent(new CustomEvent("longpress"));
    }, duration);
  }
  function handleMouseUp() {
    clearTimeout(timer);
  }

  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mouseup", handleMouseUp);

  return {
    // runs when options are updated.
    update(newOptions) {
      options = newOptions;
    },

    // this function will run when the element is destroyed.
    destroy() {
      clearTimeout(timer);
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("mouseup", handleMouseUp);
    },
  };
}
