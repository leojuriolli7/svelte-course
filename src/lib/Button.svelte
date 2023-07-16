<script>
  export let size = "small";
  export let shadow = false;
  export let bgColor = undefined;
  export let textColor = undefined;

  let isHoveringLeftIcon = false;
</script>

<button
  style:--buttonBgColor={bgColor}
  style:--buttonTextColor={textColor}
  class:shadow
  class:size-lg={size === "large"}
  class:size-sm={size === "small"}
  class:hasLeft={$$slots.leftContent}
  on:click
  {...$$restProps}
>
  {#if $$slots.leftContent}
    <div
      role="img"
      on:mouseenter={() => (isHoveringLeftIcon = true)}
      on:mouseleave={() => (isHoveringLeftIcon = false)}
      class="left-content"
    >
      <slot name="leftContent" namedSlotProp="example" />
    </div>
  {/if}
  <slot {isHoveringLeftIcon}>Fallback value</slot>
</button>

<style lang="scss">
  button {
    display: flex;
    gap: 10px;
    align-items: center;
    border: none;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: all 200ms ease;
    background-color: var(--buttonBgColor);
    color: var(--buttonTextColor);

    &:disabled {
      opacity: 0.6;
      pointer-events: none;
      cursor: not-allowed;
    }

    &.shadow {
      box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
    }

    &.size-sm {
      padding: 15px 20px;
    }

    &.size-lg {
      padding: 20px 25px;
      font-size: 20px;
    }

    &:hover {
      filter: brightness(0.9);
    }

    &:active {
      transform: scale(0.9);
    }
  }
</style>
