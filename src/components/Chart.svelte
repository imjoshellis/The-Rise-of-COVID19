<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'
  import confirmed from '../data/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
  import deaths from '../data/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'
  import recovered from '../data/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'

  console.log(confirmed, recovered, deaths)
  const confirmedItaly = confirmed[16]
  const confirmedKorea = confirmed[156]
  let chartData = {}

  onMount(async () => {
    const italyData = await processData(confirmedItaly)
    const koreaData = await processData(confirmedKorea)
    chartData.labels = await italyData.dateArray
    chartData.italy = await italyData.country
    chartData.italyData = await italyData.valueArray
    chartData.korea = await koreaData.country
    chartData.koreaData = await koreaData.valueArray
    await renderChart()
  })

  const processData = o => {
    let dataObj = { country: o['Country/Region'], dateArray: [], valueArray: [] }

    for (const date in o) {
      if (/^\d{1,2}\/\d{1,2}\/\d{2}$/i.test(date)) {
        dataObj.dateArray.push(date)
        dataObj.valueArray.push(o[date])
      }
    }
    console.log(dataObj)

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
            data: chartData.italyData
          },
          {
            label: chartData.korea,
            backgroundColor: 'rgb(25, 199, 132)',
            borderColor: 'rgb(25, 199, 132)',
            data: chartData.koreaData
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
          y: {
            gridLines: {
              drawBorder: false,
              color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
            },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10
            }
          }
        }
      }
    })
  }
</script>

<canvas id="myChart" />
<button on:click={renderChart}>reload</button>
