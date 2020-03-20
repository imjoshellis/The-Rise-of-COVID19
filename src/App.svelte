<script>
  import { data, dates, dateMax, dateIdx, allCountries } from './data/stores.js'
  import getApi from './data/data.js'
  import Tailwindcss from './Tailwindcss.svelte'
  import RegionGrid from './components/RegionGrid.svelte'
  import DateController from './components/DateController.svelte'
  import GlobalData from './components/GlobalData.svelte'
  import RegionFilter from './components/RegionFilter.svelte'

  const waitForApi = async () => {
    $data = await getApi()
    $dates = await Object.keys($data.confirmed)
    $dateMax = (await $dates.length) - 1
    $dateIdx = await $dateMax
    $allCountries = await Object.keys($data.countries).sort()
    return $data
  }

  let promise = waitForApi()
</script>

<Tailwindcss />
{#await promise}
  <div>Fetching data...</div>
{:then data}
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
  <RegionGrid />
{/await}
