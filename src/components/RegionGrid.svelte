<script>
  import data from '../data/data.js'
  import Slope from './Slope.svelte'

  let regions = Object.keys(data.regions)
  console.log(data, regions)
</script>

<style>
  h3 {
    @apply text-xl font-bold;
  }

  .chart-div {
    max-width: 3rem;
    overflow: hidden;
    @apply rounded-full;
  }

  .data-div {
    flex-basis: 70%;
  }
</style>

<div class="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
  {#each regions as region}
    <div class="flex flex-col">
      <h3>{region}</h3>
      <div class="flex flex-row">
        <div class="chart-div">
          <Slope {region} />
        </div>
        <div class="data-div">Data here</div>
      </div>
    </div>
  {/each}
</div>
