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
  import Header from "$lib/components/Header.svelte";
  import Page from "$lib/components/Page.svelte";

  export let teasers: TeaserDto[];
</script>

<svelte:head>
  <title>HTTP 203</title>
</svelte:head>
<Page>
  <Header />
  <Overview {teasers} />
</Page>
