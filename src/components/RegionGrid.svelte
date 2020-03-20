<script>
  import RegionData from './RegionData.svelte'
  import { countries } from '../data/stores.js'
</script>

<div class="grid lg:grid-cols-3 gap-4">
  {#each $countries as country}
    <RegionData {country} />
  {/each}
</div>
