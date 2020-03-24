<script>
  import { data, dates, dateMax, dateValue, area, dateIdx } from './data/stores.js'
  import { getDates, parseData } from './data/data.js'
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
        $dates = await getDates(o)
        $dateMax = (await $dates.length) - 1
        $dateIdx = await $dateMax
        await fetchData()
      }
    })
  })
  const fetchData = () => {
    const datesLength = $dates.length
    for (let i = 0; i < datesLength; i++) {
      const currentDate = $dates[$dateIdx - i].split('/').join('-')
      Papa.parse(`https://raw.githubusercontent.com/ulklc/covid19-timeseries/master/report/daily/${currentDate}.csv`, {
        download: true,
        delimiter: ',',
        header: true,
        skipEmptyLines: true,
        complete: o => {
          $data[currentDate] = parseData(o)
        }
      })
    }
  }
</script>

<Tailwindcss />
{#if $dates.length < 1 || $dateIdx === undefined || Object.keys($data).length < 4}
  <div class="w-screen h-screen flex flex row items-center justify-center">
    <Spinner size="48" speed="500" color="#404244" thickness="2" gap="40" />
    <div class="mr-16 text-2xl">Loading data...</div>
  </div>
{:else}
  <Header />
  <AreaContainer />
{/if}
