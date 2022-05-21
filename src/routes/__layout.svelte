<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import { writable, type Readable } from "svelte/store";

  export const load: Load = () => {
    const backVisible = writable(false);
    return {
      stuff: { backVisible },
      props: { backVisible },
    };
  };
</script>

<script lang="ts">
  import Header from "$lib/components/Header.svelte";

  export let backVisible: Readable<boolean>;
</script>

<div class="app">
  <div class="main-layout">
    <Header backVisible={$backVisible} />
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
