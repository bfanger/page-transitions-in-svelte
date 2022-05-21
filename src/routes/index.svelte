<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import api from "$lib/services/api";

  export const load: Load = async ({ stuff, fetch }) => {
    const teasers = await api.get("teasers.json", { fetch });
    stuff.backVisible.set(false);
    return {
      props: { teasers },
    };
  };
</script>

<script lang="ts">
  // eslint-disable-next-line import/extensions
  import Overview from "$lib/components/Overview.svelte";
  import type { TeaserDto } from "$lib/services/api-types";

  export let teasers: TeaserDto[];
</script>

<svelte:head>
  <title>HTTP 203</title>
</svelte:head>

<Overview {teasers} />
