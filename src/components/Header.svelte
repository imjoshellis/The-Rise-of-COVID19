<script>
  import RegionFilter from './RegionFilter.svelte'
</script>

<style type="text/scss">
  header {
    @apply flex flex-row justify-between items-center py-4;
  }
</style>

<header>
  <nav>
    <ul class="flex flex-row">
      <li on:press={reset}>Reset</li>
      <li on:press={about}>About</li>
      <li on:press={contribute}>Contribute on GitHub</li>
    </ul>
  </nav>
  <RegionFilter />
  <a href="https://ko-fi.com/T6T31IWGF" target="_blank">
    <button
      class="text-sm rounded bg-gray-700 transition-all duration-300 ease-out hover:bg-gray-500 px-4 py-2
      whitespace-no-wrap">
      ☕ Buy me a coffee →
    </button>
  </a>
</header>
