<script>
  import { data, dates, dateMax, dateIdx, allCountries } from './stores.js'
  import Tailwindcss from './Tailwindcss.svelte'
  import RegionGrid from './components/RegionGrid.svelte'
  import DateController from './components/DateController.svelte'
  import GlobalData from './components/GlobalData.svelte'
  import RegionFilter from './components/RegionFilter.svelte'
  import Data from './data/data.svelte'
  import getApi from './data.js'

  let promise = waitForApi

  waitForApi = async () => {
    $data = await getApi()
    $dates = await Object.keys($data.confirmed)
    $dateMax = (await $dates.length) - 1
    $dateIdx = await $dateMax
    $allCountries = await Object.keys($data.countries)
    return $data
  }
</script>

<Tailwindcss />
<Data />
{#await promise}
  <div>Fetching data...</div>
  {console.log('await happened')}
{:then data}
  {console.log('then happened')}
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
