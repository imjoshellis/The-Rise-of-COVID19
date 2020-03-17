<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts'
  import { onMount } from 'svelte'

  const apiURL = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats'
  let chartData = []

  // onMount(async function() {
  //   const response = await fetch(apiURL, {
  //     headers: {
  //       'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
  //       'x-rapidapi-key': '5678e57a0dmsh83ea7d4f23d48e6p1152d7jsn678f6668471c'
  //     }
  //   })

  //   let data = []
  //   data = await response.json()
  //   data.data.covid19Stats.forEach(o => {
  //     chartData.push({ label: o.country, value: o.confirmed })
  //   })
  //   console.log(data)
  //   console.log(data.data.covid19Stats)
  //   console.log(chartData)
  // })
</script>

<Tailwindcss />
<h1 class="text-red-500">Testing Tailwind</h1>
