<script>
  import data from '../data/data.js'
  import RegionData from './RegionData.svelte'

  let regions = Object.keys(data.regions)
  console.log(data, regions)
</script>

<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {#each regions as region}
    <RegionData {region} />
  {/each}
</div>
