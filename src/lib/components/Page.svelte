<script lang="ts">
  import Header from "./Header.svelte";

  export let backVisible = false;
</script>

<div class="page">
  <Header {backVisible} />
  <main class="content">
    <slot />
  </main>
</div>

<style lang="scss">
  .page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: 1;
    overflow: hidden;
  }
</style>
