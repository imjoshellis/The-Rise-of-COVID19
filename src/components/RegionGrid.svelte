<script>
  import data from '../data/data.js'
  import RegionData from './RegionData.svelte'
  import GlobalData from './GlobalData.svelte'

  let regions = Object.keys(data.regions).sort()
  console.log(data, regions)
</script>

<GlobalData {regions} />
<div class="grid lg:grid-cols-3 gap-4">
  {#each regions as region}
    <RegionData {region} />
  {/each}
</div>
