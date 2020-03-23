<script>
  import { filterStr } from '../data/stores.js'
  import { onMount } from 'svelte'

  onMount(() => {
    feather.replace()
  })
</script>

<style type="text/css">
  div {
    overflow: hidden;
    @apply bg-gray-800 text-gray-200 rounded;
  }
  input[type='text'] {
    @apply bg-gray-800 text-gray-200 text-sm pr-4 pl-2 py-2 w-full mx-auto;
  }

  input[type='text']:focus {
    @apply border-none;
  }
</style>

<div class="flex flex-row justify-center w-full mx-4">
  <div class="flex flex-row py-2 pl-2 items-center justify-center text-gray-300">
    <label for="country">
      <i data-feather="search" style="height:1.25rem;width:1.25rem;" />
    </label>
  </div>
  <input placeholder="Filter by Name" type="text" name="country" id="country" bind:value={$filterStr} />
</div>
