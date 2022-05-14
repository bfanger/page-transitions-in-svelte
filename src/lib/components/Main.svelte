<main class="main">
  <slot />
</main>

<style lang="scss">
  .main {
    display: grid;
    grid-template-columns: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    @media (min-width: 900px) {
      display: block;
    }
  }
</style>
