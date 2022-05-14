<script lang="ts">
  export let href: string;
  export let src: string;
  export let alt: string;
  export let title: string;
</script>

<a class="video-link" {href}>
  <img class="video-thumb" {src} {alt} />
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
