<script lang="ts">
  import { onMount } from "svelte";

  export let videoId: string;
  export let poster: string;
  export let alt: string;

  let opacity = 1;
  onMount(() => {
    opacity = 0;
  });
</script>

<div class="video ">
  <iframe
    class="embed aspect"
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/{videoId}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />

  <img class="poster aspect" style:opacity src={poster} {alt} />
</div>

<style>
  .video {
    display: grid;
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
    transition: opacity 0.5s ease-in-out;
    will-change: opacity;
  }
</style>
