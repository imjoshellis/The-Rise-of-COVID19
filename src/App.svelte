<script>
  import { data, dates, dateMax, dateIdx, allCountries } from './data/stores.js'
  import AreaContainer from './components/Area/AreaContainer.svelte'
  import getApi from './data/data.js'
  import Tailwindcss from './Tailwindcss.svelte'
  import RegionGrid from './components/RegionGrid.svelte'
  import DateController from './components/DateController.svelte'
  import RegionFilter from './components/RegionFilter.svelte'
  import Spinner from 'svelte-spinner'
  import Header from './components/Header.svelte'

  const waitForApi = async () => {
    $data = await getApi()
    $dates = await Object.keys($data.active)
    $dateMax = (await $dates.length) - 1
    $dateIdx = await $dateMax
    $allCountries = await Object.keys($data.countries).sort()
    return $data
  }

  let promise = waitForApi()
</script>

<Tailwindcss />
{#await promise}
  <div class="w-screen h-screen flex flex row items-center justify-center">
    <Spinner size="48" speed="500" color="#404244" thickness="2" gap="40" />
    <div class="mr-16 text-2xl">Fetching data...</div>
  </div>
{:then data}
  <div class="sticky w-full bg-gray-900 z-50 pb-4" style="top:0;">
    <Header />
    <div class="flex flex-row items-center justify-beween">
      <div class="flex-grow">
        <DateController />
      </div>
    </div>
  </div>

  <AreaContainer />
{/await}
