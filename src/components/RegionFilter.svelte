<script>
  import { countryStr } from '../data/stores.js'
</script>

<style type="text/css">
  input[type='text'] {
    @apply bg-gray-800 text-gray-200 px-4 py-2 w-64 mx-auto border-none;
  }

  input[type='text']:focus {
    @apply border-none;
  }
</style>

<input placeholder="Filter Countries by Name" type="text" name="region" id="region" bind:value={$countryStr} />
