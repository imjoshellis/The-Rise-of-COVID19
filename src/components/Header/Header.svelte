<script>
  import About from './About.svelte'
  import RegionFilter from './RegionFilter.svelte'
  import SocialButtons from './SocialButtons.svelte'
  import Nav from './Nav.svelte'
  import DateController from './DateController.svelte'

  $: about = false
  const toggleAbout = () => {
    about = !about
  }
</script>

<style type="text/scss">
  header {
    @apply flex justify-between items-center py-2 mx-4;
  }
</style>

<div class="sticky w-full bg-gray-900 z-50 pb-4" style="top:0;">
  <header class="flex flex-col sm:flex-row">
    <div class="text-2xl text-gray-300 font-bold whitespace-no-wrap pr-4 py-2">The Rise of Covid-19</div>
    <div class="flex flex-row">
      <Nav {toggleAbout} />
      <SocialButtons />
    </div>

    <RegionFilter />
  </header>

  {#if about}
    <About {toggleAbout} />
  {/if}

  <div class="flex flex-row items-center justify-beween">
    <div class="flex-grow">
      <DateController />
    </div>
  </div>
</div>
