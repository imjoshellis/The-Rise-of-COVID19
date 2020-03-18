<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'
  import data from '../data/data.js'

  console.log(data)

  const last = function(array, n) {
    if (array == null) return void 0
    if (n == null) return array[array.length - 1]
    return array.slice(Math.max(array.length - n, 0))
  }

  onMount(async () => {
    await renderChart()
  })

  let x = '100'
  let yValue = last(data.regions['US'].total.confirmedDelta) * 50
  let yUp = (0 - 1) * yValue + 50 + ''
  let yDown = yValue + 50 + ''

  const renderChart = () => {
    var ctx = document.getElementById('myChart').getContext('2d')
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [
          {
            label: 'Korea, South',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data.regions['Korea, South'].total.confirmedDelta,
            fill: false
          },
          {
            label: 'US',
            backgroundColor: 'rgb(25, 199, 132)',
            borderColor: 'rgb(25, 199, 132)',
            data: data.regions['US'].total.confirmedDelta,
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

<style>
  .svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%
    vertical-align: middle;
    overflow: hidden;
  }
  .svg-content {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<div class="svg-container">
  <svg
    class="svg-content p-16 rounded-lg bg-gray-800"
    version="1.1"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMinYMin meet"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg">

    <line x1="50" x2="100" y1="50" y2={yUp} class="stroke-current text-pink-500" stroke-width="1" />
    <line x1="50" x2="0" y1="50" y2={yDown} class="stroke-current text-pink-500" stroke-width="1" />

  </svg>
</div>
