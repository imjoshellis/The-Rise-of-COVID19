<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'
  import data from '../data/data.js'

  console.log(data)

  // console.log(population)
  const confirmedItaly = deaths[16]
  const deathsItaly = deaths[16]
  let chartData = {}

  onMount(async () => {
    const italyData = await processData(confirmedItaly)
    const italyDeaths = await processData(deathsItaly)
    chartData.labels = await italyData.dateArray
    chartData.italy = await italyData.country
    chartData.italyData = await italyData.valueArray
    chartData.italyDeathsLabel = 'true cases based on deaths'
    chartData.italyDeathsValues = await italyDeaths.valueArray.map(x => mapDeaths(x))
    await renderChart()
  })

  const mapDeaths = death => {
    const fatalityRate = 0.0087
    const numCasesCausedDeaths = death / fatalityRate
    const daysFromInfectionToDeath = 17.3
    const doublingTime = 6.18
    const numTimesDoubled = daysFromInfectionToDeath / doublingTime
    const trueCases = numCasesCausedDeaths * Math.pow(2, numTimesDoubled)
    return trueCases
  }

  const processData = o => {
    let dataObj = { country: o['Country/Region'], dateArray: [], valueArray: [] }

    for (const date in o) {
      if (/^\d{1,2}\/\d{1,2}\/\d{2}$/i.test(date)) {
        dataObj.dateArray.push(date)
        dataObj.valueArray.push(o[date])
      }
    }

    return dataObj
  }

  const renderChart = () => {
    var ctx = document.getElementById('myChart').getContext('2d')
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: chartData.italy,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: chartData.italyData,
            fill: false
          },
          {
            label: chartData.italyDeathsLabel,
            backgroundColor: 'rgb(25, 199, 132)',
            borderColor: 'rgb(25, 199, 132)',
            data: chartData.italyDeathsValues,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Grid Line Settings'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: '#5f616366'
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: '#5f616366'
              }
            }
          ]
        }
      }
    })
  }
</script>

<canvas id="myChart" />
<button on:click={renderChart}>reload</button>
