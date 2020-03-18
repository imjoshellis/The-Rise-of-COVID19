<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'
  import data from '../data/data.js'

  console.log(data)

  onMount(async () => {
    await renderChart()
  })

  const renderChart = () => {
    var ctx = document.getElementById('myChart').getContext('2d')
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [
          {
            label: 'Japan',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data.regions['Japan'].total.confirmed,
            fill: false
          },
          {
            label: 'US',
            backgroundColor: 'rgb(25, 199, 132)',
            borderColor: 'rgb(25, 199, 132)',
            data: data.regions['US'].total.confirmed,
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
