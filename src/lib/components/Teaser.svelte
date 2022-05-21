<script lang="ts">
  import { intro, outro } from "$lib/services/thumbnailTransition";

  export let videoId: string;
  export let href: string;
  export let src: string;
  export let alt: string;
  export let title: string;

  let clicking = false;
</script>

<a
  class="video-link"
  {href}
  on:click|capture={() => {
    clicking = true;
  }}
>
  <img
    class="video-thumb"
    {src}
    {alt}
    in:intro={videoId}
    out:outro={clicking ? videoId : {}}
  />
  <p class="video-meta"><time>{title}</time></p>
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
  }
  .video-meta {
    background: var(--white);
    margin: 0;
    padding: 0.4rem 1rem;
  }
</style>
