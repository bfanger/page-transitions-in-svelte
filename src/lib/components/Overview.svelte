<script lang="ts" context="module">
  let previousScrollTop = 0;
</script>

<script lang="ts">
  import type { TeaserDto } from "$lib/services/episode-fns";
  import { onMount } from "svelte";
  import Switch from "./Switch.svelte";
  import Teaser from "./Teaser.svelte";

  export let teasers: TeaserDto[];
  export let cohost: string | undefined = undefined;

  let el: HTMLDivElement;
  onMount(() => {
    el.scrollTop = previousScrollTop;
  });
  function onScroll() {
    previousScrollTop = el.scrollTop;
  }
</script>

<div class="background" bind:this={el} on:scroll={onScroll}>
  <Switch active={cohost} />
  <ul class="grid">
    {#each teasers as teaser (teaser.href)}
      <li>
        <Teaser {...teaser} crossfade />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .background {
    background-color: var(--background);
    height: 100%;
    overflow-y: auto;
  }
  .grid {
    display: grid;
    gap: var(--content-padding);
    grid-auto-columns: var(--video-list-auto-columns);
    grid-auto-flow: var(--video-list-auto-flow);
    grid-auto-rows: var(--video-list-auto-rows);
    grid-template-columns: var(
      --video-list-columns,
      repeat(auto-fill, minmax(300px, 1fr))
    );
    margin: 0;
    padding: var(--content-padding);
    > li {
      display: block;
      box-shadow: 0 4px 4px rgb(0 0 0 / 10%);
    }
  }
</style>
