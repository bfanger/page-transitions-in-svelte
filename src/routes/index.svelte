<script lang="ts">
  // eslint-disable-next-line import/extensions
  import Header from "$lib/components/Header.svelte";
  import type { TeaserDto } from "$lib/services/episode-fns";
  import Overview from "$lib/components/Overview.svelte";

  export let teasers: TeaserDto[];
</script>

<svelte:head>
  <title>HTTP 203</title>
</svelte:head>

<Header />
<Overview {teasers} />
