<script lang="ts">
  import Overview from "$lib/components/Overview.svelte";
  import Page from "$lib/components/Page.svelte";
  import imageUrl from "../assets/page-transitions-svelte.jpg";
  import type { PageData } from "./$types";

  export let data: PageData;

  let baseUrl = "";

  if (import.meta.env.PROD) {
    baseUrl = "https://http203-playlist-svelte.netlify.app";
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
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@jaffathecake" />
  <meta name="twitter:creator" content="@bfanger" />
  <meta property="og:image" content="{baseUrl}{imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image" content="{baseUrl}{imageUrl}" />
</svelte:head>
<Page>
  <Overview teasers={data.teasers} />
</Page>
