<script>
  import data from '../data/data.js'
  import RegionData from './RegionData.svelte'
  import GlobalData from './GlobalData.svelte'
  import RegionFilter from './RegionFilter.svelte'

  export let regions
</script>

<GlobalData {regions} />
<RegionFilter />
<div class="grid lg:grid-cols-3 gap-4">
  {#each regions as region}
    <RegionData {region} />
  {/each}
</div>
