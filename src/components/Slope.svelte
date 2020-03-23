<script>
  import { last } from '../data/data.js'

  export let p

  $: theta = Math.atan(p.nowRate)
</script>

<style type="text/scss">
  svg {
    display: inline-block;
    width: 100%;
  }

  .child {
    grid-area: 1 / 1 / 2 / 2;
  }

  .svg-wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
</style>

<div class="svg-wrap">
  <div class="child container transition-all duration-300 ease-out {p.color}" style="transform: rotate(-{theta}rad);">
    <svg
      class="stroke-current"
      version="1.1"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg">
      <line x1="0" x2="100" y1="50" y2="50" stroke-width="2" />
    </svg>
  </div>
  <svg
    class="stroke-current child"
    version="1.1"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">
    <line x1="0" x2="100" y1="100" y2="0" class="text-gray-600" stroke-width="1" />
  </svg>
</div>
