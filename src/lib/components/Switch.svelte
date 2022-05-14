<script lang="ts">
  import cohosts from "$lib/cohosts.json";

  export let active: string | undefined = undefined;
</script>

<ol class="switch">
  <li><a class="item" class:active={!active} href="/">All</a></li>
  {#each cohosts as cohost}
    <li>
      <a
        class="item"
        class:active={active === cohost.slug}
        href="/with-{cohost.slug}">{cohost.name}</a
      >
    </li>
  {/each}
</ol>

<style lang="scss">
  .switch {
    background: var(--white);
    border-radius: 19px;
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto;
    margin-top: var(--content-padding);
    padding: 0.3rem 0.4rem;
    width: fit-content;
    > li {
      display: block;
    }
  }
  .item {
    border-radius: 1000px;
    color: var(--primary-color);
    display: block;
    padding: 0.1rem 0.9rem;
  }
  .active {
    background: var(--primary-color);
    color: #fff;
  }
</style>
