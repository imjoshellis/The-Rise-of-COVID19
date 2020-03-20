<script>
  import RegionFilter from './RegionFilter.svelte'
  import SocialButtons from './SocialButtons.svelte'
  import Nav from './Nav.svelte'
</script>

<style type="text/scss">
  header {
    @apply flex flex-row justify-between items-center py-4;
  }
</style>

<header>
  <div class="text-3xl text-gray-300 font-bold whitespace-no-wrap px-4 py-2">Covid Curves</div>
  <Nav />
  <RegionFilter />
  <SocialButtons />
</header>
