<script lang="ts">
  import type { TeaserDto } from "$lib/services/episode-fns";
  import Main from "./Main.svelte";
  import Switch from "./Switch.svelte";
  import Teaser from "./Teaser.svelte";

  export let teasers: TeaserDto[];
  export let cohost: string | undefined = undefined;
</script>

<Main>
  <Switch active={cohost} />
  <div class="grid">
    {#each teasers as teaser (teaser.href)}
      <Teaser {...teaser} />
    {/each}
  </div>
</Main>

<style lang="scss">
  .grid {
    background: var(--divider);
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
  }
</style>
