<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import api from "$lib/services/api";
  import cohosts from "$lib/cohosts.json";

  export const load: Load = async ({ params, stuff, fetch }) => {
    const teasers = await api.get("teasers/[cohost].json", { params, fetch });
    stuff.backVisible.set(false);
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

  export let cohost: string;
  export let name: string;
  export let teasers: TeaserDto[];
</script>

<svelte:head>
  <title>HTTP 203 - with {name}</title>
</svelte:head>

<Overview {teasers} {cohost} />
