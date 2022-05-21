<script lang="ts">
  // eslint-disable-next-line import/extensions
  import { afterNavigate } from "$app/navigation";

  import Header from "./Header.svelte";

  export let backVisible = false;

  let el: HTMLElement;

  afterNavigate(() => {
    el.scrollTo(0, 0);
  });
</script>

<div class="page">
  <Header {backVisible} />
  <main class="content" bind:this={el}>
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
    overflow: auto;
  }
</style>
