<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import RegionGrid from './components/RegionGrid.svelte'
  import DateController from './components/DateController.svelte'
  import { onMount } from 'svelte'
  import data from './data/data.js'

  let regions = Object.keys(data.regions).sort()
</script>

<style>

</style>

<Tailwindcss />
<h1>COVID-19 SLOPES</h1>
<DateController {regions} />
<RegionGrid {regions} />
