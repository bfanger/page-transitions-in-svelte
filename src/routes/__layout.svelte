<div class="layout">
  <slot />
</div>

<style lang="scss">
  :global {
    @import "../global.scss";
  }
  .layout {
    display: grid;
    // grid-template-columns: 1fr;
    // grid-template-rows: 1fr;
  }
</style>
