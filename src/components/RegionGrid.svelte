<script>
  import data from '../data/data.js'
  import RegionData from './RegionData.svelte'
  import { regions } from '../stores.js'
</script>

<div class="grid lg:grid-cols-3 gap-4">
  {#each $regions as region}
    <RegionData {region} />
  {/each}
</div>
