<script>
  import { data, dates, dateMax, dateValue, dateIdx } from './data/stores.js'
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
        $dates = getDates(o)
        $dateMax = (await $dates.length) - 1
        $dateIdx = await $dateMax
        await console.log($data)
      }
    })
  })
</script>

<Tailwindcss />
{#if false}
  <Header />
  <AreaContainer />
{/if}
