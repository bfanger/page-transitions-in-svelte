<script lang="ts">
  import { activeVideoId, pageIn, pageOut } from "$lib/services/pageCrossfade";
  import { fade } from "svelte/transition";

  export let videoId: string;
  export let href: string;
  export let src: string;
  export let alt: string;
  export let title: string;
  export let crossfade = false;

  function preClick() {
    $activeVideoId = videoId;
  }
</script>

<a class="video-link" {href} on:click|capture={preClick}>
  <img
    class="video-thumb"
    {src}
    {alt}
    in:pageIn={crossfade ? `thumb/${videoId}` : {}}
    out:pageOut={crossfade && $activeVideoId === videoId
      ? `thumb/${videoId}`
      : {}}
  />
  <p
    class="video-meta"
    in:pageIn={crossfade ? `meta/${videoId}` : {}}
    out:pageOut={crossfade && $activeVideoId === videoId
      ? `meta/${videoId}`
      : {}}
  >
    <time in:fade={{ delay: 100, duration: 200 }}>{title}</time>
  </p>
</a>

<style lang="scss">
  .video-link {
    color: inherit;
    &:hover {
      text-decoration: none;
    }
  }
  .video-thumb {
    aspect-ratio: 16/9;
    display: block;
    height: auto;
    object-fit: cover;
    width: 100%;
    backface-visibility: hidden;
  }
  .video-meta {
    background-color: var(--white);
    margin: 0;
    padding: 0.6rem 1.6rem;
    backface-visibility: hidden;
    > time {
      will-change: opacity;
    }
  }
</style>
