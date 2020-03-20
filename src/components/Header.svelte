<script>
  import RegionFilter from './RegionFilter.svelte'
</script>

<style type="text/scss">
  header {
    @apply flex flex-row;
  }
</style>

<header>
  <div>
    <RegionFilter />
  </div>

  <a href="https://ko-fi.com/T6T31IWGF" target="_blank">
    <button class="rounded bg-blue-400 px-4 py-2">☕ Buy me a coffee</button>
    <img
      height="36"
      style="border:0px;height:36px;"
      src="https://az743702.vo.msecnd.net/cdn/kofi1.png?v=2"
      border="0"
      alt="Buy Me a Coffee at ko-fi.com" />
  </a>
</header>
