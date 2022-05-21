<script lang="ts">
  import { intro, outro } from "$lib/services/thumbnailTransition";

  export let videoId: string;
  export let poster: string;
  export let alt: string;

  let opacity = 1;

  function onLoad() {
    opacity = 0;
  }
</script>

<div class="video" in:intro={videoId} out:outro={videoId}>
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
    transition: opacity 0.5s 0.1s ease-in-out;
    will-change: opacity;
  }
</style>
