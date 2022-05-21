<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import api from "../lib/services/api";
  import cohosts from "$lib/cohosts.json";

  export const load: Load = async ({ params, fetch }) => {
    const teasers = await api.get("teasers/[cohost].json", { params, fetch });
    return {
      props: {
        cohost: params.cohost,
        name: cohosts.find((entry) => entry.slug === params.cohost)?.name,
        teasers,
      },
    };
  };
</script>

<script lang="ts">
  import Overview from "$lib/components/Overview.svelte";
  import type { TeaserDto } from "$lib/services/api-types";
  import Header from "$lib/components/Header.svelte";
  import Page from "$lib/components/Page.svelte";

  export let cohost: string;
  export let name: string;
  export let teasers: TeaserDto[];
</script>

<svelte:head>
  <title>HTTP 203 - with {name}</title>
</svelte:head>
<Page>
  <Header />
  <Overview {teasers} {cohost} />
</Page>
