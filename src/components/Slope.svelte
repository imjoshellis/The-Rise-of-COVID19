<script>
  import data from '../data/data.js'

  const last = function(array, n) {
    if (array == null) return void 0
    if (n == null) return array[array.length - 1]
    return array.slice(Math.max(array.length - n, 0))
  }

  export let region

  const confirmedDeltaCurrent = data.regions[region].total.confirmedDelta
  const recent = last(confirmedDeltaCurrent)
  const recentValue = Math.round(recent * 100) / 100
  // const sum = recent.reduce((a, b) => a + b, 0)
  // const avg = sum / 5

  let yValue = recent * 50
  let yUp = (0 - 1) * yValue + 50 + ''
  let yDown = yValue + 50 + ''
  let color = recent > 1 ? 'text-red-500' : 'text-green-500'
</script>

<style>
  svg {
    display: inline-block;
    width: 100%;
  }
</style>

<div class={color}>
  <svg
    class="stroke-current"
    version="1.1"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="100" y1="100" y2="0" stroke-width="1" class="text-gray-500" />
    <line x1="50" x2="100" y1="50" y2={yUp} stroke-width="5" />
    <line x1="50" x2="0" y1="50" y2={yDown} stroke-width="5" />
  </svg>
</div>
