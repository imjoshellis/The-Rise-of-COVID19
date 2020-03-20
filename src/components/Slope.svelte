<script>
  import { last } from '../data/data.js'

  export let growing
  export let nowRate

  $: yValue = nowRate * 50
  $: yUp = (0 - 1) * yValue + 50 + ''
  $: yDown = yValue + 50 + ''
  $: color = growing ? 'text-red-500' : 'text-green-500'
</script>

<style type="text/scss">
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
    <line x1="50" x2="100" y1="50" y2={yUp} stroke-width="2" />
    <line x1="50" x2="0" y1="50" y2={yDown} stroke-width="2" />
  </svg>
</div>
