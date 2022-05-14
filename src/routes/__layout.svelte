<div class="app">
  <div class="main-layout">
    <slot />
  </div>
</div>

<style lang="scss">
  :global {
    @import "../global.scss";
  }
  .app {
    height: 100%;
  }
  .main-layout {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
  }
</style>
