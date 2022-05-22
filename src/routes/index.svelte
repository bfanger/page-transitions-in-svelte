<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import api, { loadError } from "$lib/services/api";

  export const load: Load = async ({ fetch }) => {
    try {
      const teasers = await api.get("teasers.json", { fetch });
      return {
        props: { teasers },
      };
    } catch (err) {
      return loadError(err);
    }
  };
</script>

<script lang="ts">
  // eslint-disable-next-line import/extensions
  import Overview from "$lib/components/Overview.svelte";
  import type { TeaserDto } from "$lib/services/api-types";
  import Page from "$lib/components/Page.svelte";
  import imageUrl from "../assets/page-transitions-svelte.png";

  export let teasers: TeaserDto[];
  if (import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.log(
      `%cSource: https://github.com/bfanger/page-transitions-in-svelte

Page Transition presentation: https://youtu.be/JCJUPJ_zDQ4
Original Website: https://http203-playlist.netlify.app/
Original Source: https://github.com/jakearchibald/http203-playlist`,
      "font: 600 12px/1.5 sans-serif ; color: #664c95"
    );
  }
</script>

<svelte:head>
  <title>HTTP 203</title>
  <meta
    property="og:title"
    content="Page Transitions demo site converted to Svelte"
  />
  <meta
    property="og:description"
    content="A reimplementation of the transitions using SvelteKit. Inspired by Jake Archibald presentation https://youtu.be/JCJUPJ_zDQ4 'Bringing page transitions to the web'"
  />
  <meta property="og:image" content={imageUrl} />
</svelte:head>
<Page>
  <Overview {teasers} />
</Page>
