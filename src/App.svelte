<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import RegionGrid from './components/RegionGrid.svelte'
  import DateController from './components/DateController.svelte'
  import GlobalData from './components/GlobalData.svelte'
  import RegionFilter from './components/RegionFilter.svelte'
  import { regions } from './data/stores.js'
</script>

<Tailwindcss />
<div class="flex flex-row items-center justify-beween">
  <div>
    <RegionFilter />
  </div>
  <div class="flex-grow">
    <DateController />
  </div>
</div>

<div class="my-8">
  <GlobalData />
</div>
<RegionGrid {regions} />
