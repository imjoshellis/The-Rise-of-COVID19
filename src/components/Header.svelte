<script>
  import About from './About.svelte'
  import RegionFilter from './RegionFilter.svelte'
  import SocialButtons from './SocialButtons.svelte'
  import Nav from './Nav.svelte'

  $: about = false
  const toggleAbout = () => {
    about = !about
  }
</script>

<style type="text/scss">
  header {
    @apply flex flex-row justify-between items-center py-2 mx-4;
  }
</style>

<header>
  <div class="text-2xl text-gray-300 font-bold whitespace-no-wrap pr-4 py-2">The Rise of Covid</div>
  <Nav {toggleAbout} />
  <RegionFilter />
  <SocialButtons />
</header>

{#if about}
  <About {toggleAbout} />
{/if}
