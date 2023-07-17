import tippyLib from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

export default function tippy(node, options) {
  const instance = tippyLib(node, options);

  return {
    update(newOptions) {
      // @ts-ignore
      instance.setProps(newOptions);
    },

    destroy() {
      // @ts-ignore
      instance.destroy();
    },
  };
}
