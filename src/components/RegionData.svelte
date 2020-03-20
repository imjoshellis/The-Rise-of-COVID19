<script>
  import { last } from '../data/data.js'
  import { dateIdx, data, dates } from '../data/stores.js'
  import Slope from './Slope.svelte'

  export let country

  const rnd2 = x => Math.round(x * 100) / 100
  const rnd0 = x => Math.round(x)

  const arrow = (x, y) => (x > y ? '▴' : x === y ? '·' : '▾')
  const redGreen = (x, y) => (x > y ? 'text-red-500' : 'text-green-500')

  $: recent = last($dates.slice(0, $dateIdx), 4)
  $: today = $data.countries[country].total.confirmed[recent[3]]
  $: yesterday = $data.countries[country].total.confirmed[recent[2]]
  $: twoAgo = $data.countries[country].total.confirmed[recent[1]]
  $: threeAgo = $data.countries[country].total.confirmed[recent[0]]

  $: nowRate = today / yesterday
  $: prevRate = yesterday / twoAgo
  $: prevprevRate = twoAgo / threeAgo

  $: deltaRate = rnd2(nowRate) / rnd2(prevRate)
  $: prevDeltaRate = rnd2(prevRate) / rnd2(prevprevRate)
  $: week = today * Math.pow(nowRate, 7)
  $: thirtyDays = today * Math.pow(nowRate, 30)
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

{#if nowRate > 0 && nowRate !== Infinity && prevRate !== Infinity}
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
        <div class="data-text {redGreen(nowRate, prevRate)}">{arrow(nowRate, prevRate)} Today: {rnd2(nowRate)}</div>
        <div class="data-subtext">{arrow(prevRate, prevprevRate)} Yesterday: {rnd2(prevRate)}</div>
        <div class="data-subtext">{arrow(deltaRate, prevDeltaRate)} Rate of Rate: {rnd2(deltaRate)}</div>
        <h4>Future Based on Today's Rate</h4>
        <div class="data-text">Total cases in 7d: {rnd0(week)}</div>
        <div class="data-subtext">New cases in 7d: {rnd0(week) - today}</div>

      </div>
    </div>

  </div>
{/if}
