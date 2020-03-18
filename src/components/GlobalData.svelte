<script>
  import data, { last } from '../data/data.js'
  import RegionSquare from './RegionSquare.svelte'

  export let regions

  const rnd2 = x => Math.round(x * 100) / 100
  const rnd0 = x => Math.round(x)

  const arrow = (x, y) => (x > y ? '▴' : x === y ? '·' : '▾')
  const redGreen = (x, y) => (x > y ? 'text-red-500' : 'text-green-500')

  const recent = last(data.confirmed, 4)
  const today = recent[3]
  const yesterday = recent[2]
  const twoAgo = recent[1]
  const threeAgo = recent[0]

  const nowRate = today / yesterday
  const prevRate = yesterday / twoAgo
  const prevprevRate = twoAgo / threeAgo

  const deltaRate = rnd2(nowRate) / rnd2(prevRate)
  const prevDeltaRate = rnd2(prevRate) / rnd2(prevprevRate)
  const week = today * Math.pow(nowRate, 7)
  const thirtyDays = today * Math.pow(nowRate, 30)

  let yValue = nowRate * 50
  let yUp = (0 - 1) * yValue + 50 + ''
  let yDown = yValue + 50 + ''
  let color = deltaRate > 1 ? 'text-red-500' : 'text-green-500'
</script>

<style type="text/scss">
  h3 {
    @apply text-3xl font-bold;
  }

  .chart-wrap {
    flex-basis: 30%;
    max-width: 10rem;
  }
  .chart-div {
    overflow: hidden;
    border-radius: 9999px;
    @apply mx-2;
  }

  .data-div {
    flex-basis: 70%;
    @apply text-sm flex flex-col font-mono;
  }

  .data-subtext {
    @apply text-xs;
  }

  h4 {
    @apply font-bold mt-2;
  }
  svg {
    display: inline-block;
    width: 100%;
  }

  .region-squares {
    @apply flex flex-col flex-wrap h-12 items-center justify-start content-center;
  }
</style>

<div class="flex flex-col">
  <div class="flex flex-row justify-center">
    <div class="chart-wrap">
      <div class="chart-div">
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
      </div>
    </div>
    <div>
      <h3>Global</h3>
      <div class="grid-cols-3 grid">
        <div class="data-div">
          <h4>Confirmed Cases</h4>
          <div class="data-text ">Today: {today}</div>
          <div class="data-subtext">Yesterday: {yesterday}</div>
          <div class="data-subtext">Two Days Ago: {twoAgo}</div>
        </div>
        <div class="data-div">
          <h4>Rate of Growth</h4>
          <div class="data-text {redGreen(nowRate, prevRate)}">{arrow(nowRate, prevRate)} Today: {rnd2(nowRate)}</div>
          <div class="data-subtext">{arrow(prevRate, prevprevRate)} Yesterday: {rnd2(prevRate)}</div>
          <div class="data-subtext">{arrow(deltaRate, prevDeltaRate)} Rate of Rate: {rnd2(deltaRate)}</div>
        </div>
        <div class="data-div">
          <h4>Future Based on Today's Rate</h4>
          <div class="data-subtext">New cases in 7d: {rnd0(week) - today}</div>
          <div class="data-subtext">Total cases in 7d: {rnd0(week)}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="region-squares">
    {#each regions as region}
      <RegionSquare {region} />
    {/each}
  </div>
</div>
