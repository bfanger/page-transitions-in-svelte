<script lang="ts">
  export let backVisible = false;
</script>

<header class="header" class:show-back-icon={backVisible}>
  <a href="/" class="home-link">
    {#if backVisible}
      <svg class="back-icon" viewBox="0 0 24 24">
        <path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z" />
      </svg>
    {/if}
    <span class="header-text">HTTP 203</span></a
  >
</header>

<style lang="scss">
  .header {
    align-items: center;
    background: var(--primary-color);
    color: var(--white);
    display: grid;
    height: 54px;
    padding: 0 var(--content-padding);
    &.show-back-icon {
      padding: 0 10px;
    }
  }

  .home-link {
    align-items: center;
    display: grid;
    gap: 0.3rem;
    fill: var(--white);
    color: inherit;
    width: max-content;
    .show-back-icon & {
      grid-template-columns: 31px 1fr;
    }
  }
  .back-icon {
    display: block;
  }
  .header-text {
    fill: var(--white);
    color: inherit;
  }
</style>
