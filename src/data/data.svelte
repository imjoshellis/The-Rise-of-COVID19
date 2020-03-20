<script>
  import getApi from './data.js'
  import { data, dates, dateMax, dateIdx } from './stores.js'

  $: (async () => {
    $data = await getApi()
    $dates = await Object.keys($data.confirmed)
    $dateMax = (await $dates.length) - 1
    $dateIdx = $dateMax
  })()
</script>
