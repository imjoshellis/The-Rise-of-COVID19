<script>
  import data from '../data/data.js'

  const last = function(array, n) {
    if (array == null) return void 0
    if (n == null) return array[array.length - 1]
    return array.slice(Math.max(array.length - n, 0))
  }

  let yValue = last(data.regions['US'].total.confirmedDelta) * 50
  let yUp = (0 - 1) * yValue + 50 + ''
  let yDown = yValue + 50 + ''
</script>

<style>
  svg {
    display: inline-block;
    width: 100%;
  }
</style>

<div class="bg-gray-800 rounded-md">
  <svg
    class="stroke-current"
    version="1.1"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">
    <line x1="50" x2="100" y1="50" y2={yUp} stroke-width="1" />
    <line x1="50" x2="0" y1="50" y2={yDown} stroke-width="1" />
  </svg>
</div>
