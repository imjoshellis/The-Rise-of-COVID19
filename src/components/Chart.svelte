<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'

  const apiURL = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats'
  let chartData = { labels: [], data: [] }

  onMount(async () => {
    await getData()
    await renderChart()
  })

  const getData = async () => {
    const response = await fetch(apiURL, {
      headers: {
        'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
        'x-rapidapi-key': '5678e57a0dmsh83ea7d4f23d48e6p1152d7jsn678f6668471c'
      }
    })

    let data = []
    let dataObj = {}
    data = await response.json()
    data.data.covid19Stats.forEach(o => {
      if (dataObj[o.country]) {
        dataObj[o.country] += o.confirmed
      } else {
        dataObj[o.country] = o.confirmed
      }
    })
    for (const country in dataObj) {
      chartData.labels.push(country)
      chartData.data.push(dataObj[country])
    }
  }

  const renderChart = () => {
    var ctx = document.getElementById('myChart').getContext('2d')
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: chartData.data
          }
        ]
      },
      options: {}
    })
  }
</script>

<canvas id="myChart" />
<button on:click={renderChart}>reload</button>
