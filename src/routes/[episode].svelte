<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import api from "../lib/services/api";

  export const load: Load = async ({ params, fetch }) => {
    const episode = await api.get("episodes/[episode].json", { params, fetch });
    const teasers = await api.get("teasers.json", { fetch });
    return {
      props: { ...episode, teasers },
    };
  };
</script>

<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Main from "$lib/components/Main.svelte";
  import Page from "$lib/components/Page.svelte";
  import Scroller from "$lib/components/Scroller.svelte";
  import Video from "$lib/components/Video.svelte";
  import type { TeaserDto } from "$lib/services/api-types";

  export let title: string;
  export let videoId: string;
  export let poster: string;
  export let date: string;
  export let description: string;
  export let teasers: TeaserDto[];
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<Page>
  <Header backVisible />
  <Main>
    <main class="video-layout">
      <div class="video-and-details">
        {#key videoId}
          <Video {videoId} {poster} alt={title} />
        {/key}
        <div class="details">
          <h1 class="title">{title}</h1>
          <time>{date}</time>
          <div class="description">{@html description}</div>
        </div>
      </div>
      <Scroller {teasers} />
    </main>
  </Main>
</Page>

<style lang="scss">
  .video-layout {
    display: grid;
    grid-template-rows: min-content 1fr;

    @media (min-width: 900px) {
      grid-template-columns: 1fr 230px;
      grid-template-rows: none;
      height: 100%;
    }
  }
  .video-and-details {
    display: grid;
    grid-template-rows: max-content minmax(max-content, 1fr);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .details {
    background: var(--white);
    overflow: hidden;
    padding: var(--content-padding);
  }
  .title {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
    max-width: 43ch;
  }
  .description {
    line-height: 1.6;
    max-width: 67ch;
  }
</style>
