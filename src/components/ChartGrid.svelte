<script>
  import data from '../data/data.js'
  import Chart from './Chart.svelte'

  let regions = Object.keys(data.regions)
  console.log(data, regions)
</script>

<div class="grid grid-cols-4 gap-4">
  {#each regions as region}
    <div class="text-red-500">
      <h3>{region}</h3>
      <Chart {region} />
    </div>
  {/each}
  <div class="text-yellow-500">
    <h3>Japan</h3>
    <Chart region="Japan" />
  </div>
  <div class="text-green-500">
    <h3>Italy</h3>
    <Chart region="Italy" />
  </div>
  <div class="text-blue-500">
    <h3>South Korea</h3>
    <Chart region="Korea, South" />
  </div>
  <div class="text-purple-500">
    <h3>Canada</h3>
    <Chart region="Canada" />
  </div>
</div>
