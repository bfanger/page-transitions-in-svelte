<script lang="ts">
  import type { TeaserDto } from "$lib/services/api-types";
  import Teaser from "./Teaser.svelte";

  export let teasers: TeaserDto[];
</script>

<div class="scroller">
  <ol class="video-list">
    {#each teasers as teaser (teaser.href)}
      <li><Teaser {...teaser} /></li>
    {/each}
  </ol>
</div>

<style lang="scss">
  .scroller {
    --video-list-columns: none;
    --video-list-auto-flow: column;
    --video-list-auto-columns: 135px;
    align-items: start;
    background: var(--background);
    display: grid;
    min-height: 159px;
    overflow-x: auto;
    overflow-y: hidden;

    @media (min-width: 900px) {
      --video-list-auto-flow: row;
      --video-list-auto-columns: auto;
      --video-list-auto-rows: auto;
      height: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  .video-list {
    background: var(--background);
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
      box-shadow: 0 4px 4px rgb(0 0 0 / 10%);
      display: block;
    }
  }
</style>
