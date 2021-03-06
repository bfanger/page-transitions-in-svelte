<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import api from "$lib/services/api";

  export const load: Load = async ({ params, fetch }) => {
    const episode = await api.get("episodes/[episode].json", { params, fetch });
    const teasers = await api.get("teasers.json", { fetch });
    return {
      props: { ...episode, teasers },
    };
  };
</script>

<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  import Scroller from "$lib/components/Scroller.svelte";
  import Video from "$lib/components/Video.svelte";
  import type { TeaserDto } from "$lib/services/api-types";
  import { pageIn, pageOut } from "$lib/services/pageCrossfade";
  import { fade, fly, type TransitionConfig } from "svelte/transition";

  export let title: string;
  export let videoId: string;
  export let poster: string;
  export let date: string;
  export let description: string;
  export let teasers: TeaserDto[];

  let innerWidth = typeof window === "undefined" ? 0 : window.innerWidth;
  $: phoneTransition = innerWidth <= 660;

  let layoutEl: HTMLElement;
  let detailsEl: HTMLElement;
  $: {
    videoId;
    scrollToTop();
  }
  function scrollToTop() {
    if (layoutEl && detailsEl) {
      layoutEl.scrollTop = 0;
      detailsEl.scrollTop = 0;
    }
  }
  function slideOut(node: Element, _: any) {
    if (phoneTransition) {
      const transition = fly(node, {
        x: -innerWidth,
        opacity: 1,
        duration: 800,
      });
      return {
        ...transition,
        css: (t: number, u: number) =>
          `${transition.css?.(
            t,
            u
          )};position: absolute; top:0; left:0; width: 100vw; `,
      };
    }
    return undefined as any as TransitionConfig;
  }
</script>

<svelte:head>
  <title>{title} - HTTP 203</title>
</svelte:head>
<svelte:window bind:innerWidth />
<Page backVisible>
  <div class="video-layout" bind:this={layoutEl}>
    <div class="video-and-details" bind:this={detailsEl}>
      <div class="card-target">
        <div class="video-spacer" />
        <div
          class="meta-target"
          in:pageIn={`meta/${videoId}`}
          out:pageOut={`meta/${videoId}`}
        />
      </div>
      {#key videoId}
        <div
          class="slide"
          in:fly|local={phoneTransition
            ? { x: innerWidth, duration: 800, opacity: 1 }
            : { x: 70, opacity: 1 }}
          out:slideOut|local
        >
          <Video
            {videoId}
            {poster}
            alt={title}
            youtubeDelay={phoneTransition ? 850 : 450}
          />
          <div
            class="details"
            in:fade={phoneTransition
              ? { duration: 0 }
              : { delay: 100, duration: 200 }}
          >
            <h1 class="title">{title}</h1>
            <time>{date}</time>
            {phoneTransition}
            <div class="description">{@html description}</div>
          </div>
        </div>
      {/key}
    </div>
    <div class="scroller">
      <Scroller {teasers} />
    </div>
  </div>
</Page>

<style lang="scss">
  .video-layout {
    height: 100%;
    @media (max-width: 899px) {
      overflow-y: auto;
    }
    @media (min-width: 900px) {
      display: flex;
    }
  }
  .slide {
    backface-visibility: hidden;
    will-change: transform;
  }
  .scroller {
    @media (min-width: 900px) {
      width: 23rem;
      height: 100%;
      overflow-y: auto;
    }
  }
  .video-and-details {
    flex-grow: 1;
    overflow-x: hidden;
    position: relative;

    @media (min-width: 900px) {
      height: 100%;
      overflow-y: auto;
    }
  }
  .card-target {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    pointer-events: none;
    display: flex;
    flex-direction: column;
  }
  .video-spacer {
    aspect-ratio: 16/9;
  }
  .meta-target {
    flex: 1;
    background: var(--white);
    backface-visibility: hidden;
  }
  .details {
    overflow: hidden;
    padding: var(--content-padding);
    position: relative;
    background: var(--white);
    will-change: opacity;
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
