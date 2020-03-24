<script>
  import { data, dates, dateMax, dateValue, dateIdx, allCountries } from './data/stores.js'
  import { getDates } from './data/data.js'
  import { onMount } from 'svelte'
  import Tailwindcss from './Tailwindcss.svelte'
  import Spinner from 'svelte-spinner'
  import Header from './components/Header/Header.svelte'
  import AreaContainer from './components/Area/AreaContainer.svelte'
  import Papa from 'papaparse'

  onMount(() => {
    Papa.parse('https://raw.githubusercontent.com/ulklc/covid19-timeseries/master/report/country/US.csv', {
      download: true,
      delimiter: ',',
      header: true,
      skipEmptyLines: true,
      complete: async o => {
        $dates = getDates(o)
        // $dates = await Object.keys($data.active)
        $dateMax = (await $dates.length) - 1
        $dateIdx = await $dateMax
        // $allCountries = await Object.keys($data.countries).sort()
        console.log($dates)
        console.log($dateValue)
        return $data
      }
    })
  })
  const waitForApi = async () => {
    $data = await getApi()
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
  <Header />
  <AreaContainer />
{/await}
