<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import FusionCharts from 'fusioncharts'
  import Charts from 'fusioncharts/fusioncharts.charts'
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts'
  import { onMount } from 'svelte'

  const apiURL = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats'
  let data = []

  onMount(async function() {
    const response = await fetch(apiURL, {
      headers: {
        'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
        'x-rapidapi-key': '5678e57a0dmsh83ea7d4f23d48e6p1152d7jsn678f6668471c'
      }
    })
    data = await response.json()
    console.log(data)
  })

  // Always set FusionCharts as the first parameter
  fcRoot(FusionCharts, Charts, FusionTheme)
  const dataSource = {
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion'
    },
    data: [
      { label: 'Venezuela', value: '290' },
      { label: 'Saudi', value: '260' },
      { label: 'Canada', value: '180' },
      { label: 'Iran', value: '140' },
      { label: 'Russia', value: '115' },
      { label: 'UAE', value: '100' },
      { label: 'US', value: '30' },
      { label: 'China', value: '30' }
    ]
  }

  const chartConfigs = {
    type: 'column2d',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: dataSource
  }
</script>

<Tailwindcss />
<h1 class="text-red-500">Testing Tailwind</h1>
<SvelteFC {...chartConfigs} />
