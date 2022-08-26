<script lang="ts">
  import Overview from "$lib/components/Overview.svelte";
  import Page from "$lib/components/Page.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>HTTP 203 - with {data.name}</title>
</svelte:head>
<Page>
  <Overview teasers={data.teasers} cohost={data.cohost} />
</Page>
