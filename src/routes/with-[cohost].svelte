<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import type { TeaserDto } from "$lib/services/episode-fns";
  import Overview from "$lib/components/Overview.svelte";
  // eslint-disable-next-line import/extensions
  import { page } from "$app/stores";
  import cohosts from "$lib/cohosts.json";

  export let teasers: TeaserDto[];
  $: name = cohosts.find((entry) => entry.slug === $page.params.cohost)?.name;
</script>

<svelte:head>
  <title>HTTP 203 - with {name}</title>
</svelte:head>

<Header />
<Overview {teasers} cohost={$page.params.cohost} />
