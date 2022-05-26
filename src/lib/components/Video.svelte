<script lang="ts">
  import { pageIn, pageOut } from "$lib/services/pageCrossfade";
  import { onMount } from "svelte";

  export let videoId: string;
  export let poster: string;
  export let alt: string;
  export let youtubeDelay: number;

  let youtube = false;
  let opacity = 1;

  onMount(() => {
    setTimeout(() => {
      youtube = true;
    }, youtubeDelay);
  });

  function onLoad() {
    opacity = 0;
  }
</script>

<div
  class="video"
  in:pageIn={`thumb/${videoId}`}
  out:pageOut={`thumb/${videoId}`}
>
  {#if youtube}
    <iframe
      class="embed aspect"
      width="560"
      height="315"
      src="https://www.youtube-nocookie.com/embed/{videoId}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      on:load={onLoad}
    />
  {/if}

  <img class="poster aspect" style:opacity src={poster} {alt} />
</div>

<style>
  .video {
    display: grid;
    backface-visibility: hidden;
  }
  .aspect {
    aspect-ratio: 16/9;
    display: block;
    width: 100%;
    height: auto;
    grid-area: 1/1;
  }
  .embed {
    background-color: transparent;
  }
  .poster {
    object-fit: cover;
    object-position: center;
    pointer-events: none;
    transition: opacity 0.3s 0.1s ease-in-out;
    will-change: opacity;
  }
</style>
