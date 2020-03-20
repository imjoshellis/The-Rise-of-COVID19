<script>
  import { last } from '../data/data.js'
  import { dateIdx, data, dates } from '../data/stores.js'
  import Slope from './Slope.svelte'

  export let country

  const arrow = (x, y) => (x > y ? '▴' : x === y ? '·' : '▾')
  const redGreen = (x, y) => {
    const diff = x / y
    if (diff > 1.25) {
      return 'text-red-700 font-bold'
    } else if (diff > 1) {
      return 'text-red-400'
    } else if (x === y) {
      return 'text-yellow-500'
    } else if (diff < 0.75) {
      return 'text-green-700 font-bold'
    } else if (diff < 1) {
      return 'text-green-400'
    } else {
      return 'text-yellow-500'
    }
  }

  $: recent = last($dates.slice(0, $dateIdx), 4)
  $: today = $data.countries[country].total.confirmed[recent[3]]
  $: yesterday = $data.countries[country].total.confirmed[recent[2]]
  $: twoAgo = $data.countries[country].total.confirmed[recent[1]]
  $: threeAgo = $data.countries[country].total.confirmed[recent[0]]

  $: nowRate = (today / yesterday).toPrecision(3)
  $: prevRate = (yesterday / twoAgo).toPrecision(3)
  $: prevprevRate = (twoAgo / threeAgo).toPrecision(3)

  $: deltaRate = (nowRate / prevRate).toPrecision(3)
  $: prevDeltaRate = (prevRate / prevprevRate).toPrecision(3)
  // $: week = today * Math.pow(nowRate, 7)
  // $: thirtyDays = today * Math.pow(nowRate, 30)
</script>

<style type="text/scss">
  h3 {
    @apply text-3xl font-bold;
  }

  .chart-wrap {
    flex-basis: 30%;
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
</style>

{#if nowRate > 0 && nowRate !== Infinity && prevRate !== Infinity && yesterday > 0 && twoAgo > 0}
  <div class="flex flex-col">
    <h3>{country}</h3>
    <div class="flex flex-row">
      <div class="chart-wrap">
        <div class="chart-div">
          <Slope {nowRate} growing={deltaRate > 1} />
        </div>
      </div>
      <div class="data-div">
        <h4>Confirmed Cases</h4>
        <div class="data-text ">Today: {today}</div>
        <div class="data-subtext">Yesterday: {yesterday}</div>
        <div class="data-subtext">Two Days Ago: {twoAgo}</div>
        <h4>Rate of Growth</h4>
        <div class="data-text {redGreen(nowRate, prevRate)}">{arrow(nowRate, prevRate)} Today: {nowRate}</div>
        <div class="data-subtext">{arrow(prevRate, prevprevRate)} Yesterday: {prevRate}</div>
        <div class="data-subtext">{arrow(deltaRate, prevDeltaRate)} Rate of Rate: {deltaRate}</div>
      </div>
    </div>

  </div>
{/if}
