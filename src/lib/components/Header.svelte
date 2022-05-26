<script lang="ts" context="module">
  let previous: boolean | undefined;
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
  import type { TransitionConfig } from "svelte/transition";
  import { quartOut } from "svelte/easing";
  import { onMount } from "svelte";

  export let backVisible = false;

  function intro(_node: Element, _options: any): TransitionConfig {
    if (previous === backVisible) {
      return {};
    }
    previous = backVisible;
    const size = 3.6;
    return {
      duration: 300,
      easing: quartOut,
      css(t, u) {
        const x = backVisible ? t * size - size : u * size;
        return `transform: translateX(${x}rem)`;
      },
    };
  }
  onMount(() => {
    if (previous === undefined) {
      previous = backVisible;
    }
  });
</script>

<header class="header">
  {#key backVisible}
    <a href="/" class="home-link" in:intro>
      {#if backVisible}
        <svg class="back-icon" viewBox="0 0 24 24" in:fade={{ duration: 200 }}>
          <path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z" />
        </svg>
      {/if}
      <div class="header-text">HTTP 203</div>
    </a>
  {/key}
</header>

<style lang="scss">
  .header {
    position: sticky;
    top: 0;
    z-index: 1;
    align-items: center;
    background: var(--primary-color);
    color: var(--white);
    height: 5.4rem;
    padding-left: var(--content-padding);
    display: flex;
    align-items: center;
  }

  .home-link {
    display: flex;
    align-items: center;
    color: inherit;
    will-change: transform;
    -webkit-tap-highlight-color: transparent;
  }
  .back-icon {
    fill: var(--white);
    display: block;
    width: 3.1rem;
    will-change: opacity;
    margin-right: 0.5rem;
  }
  .header-text {
    fill: var(--white);
    color: inherit;
  }
</style>
