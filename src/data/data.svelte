<script>
  import getApi from './data.js'
  import { data, dates, dateMax, dateIdx, allCountries } from './stores.js'

  $: (async () => {
    $data = await getApi()
    $dates = await Object.keys($data.confirmed)
    $dateMax = (await $dates.length) - 1
    $dateIdx = await $dateMax
    $allCountries = await Object.keys($data.countries)
  })()
</script>
