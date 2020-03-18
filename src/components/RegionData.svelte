<script>
  import data, { last } from '../data/data.js'
  import Slope from './Slope.svelte'

  export let region

  const rnd2 = x => Math.round(x * 100) / 100
  const rnd0 = x => Math.round(x)

  const recent = last(data.regions[region].total.confirmed, 3)
  const today = recent[2]
  const yesterday = recent[1]
  const twoAgo = recent[0]
  const nowRate = today / yesterday
  const prevRate = yesterday / twoAgo
  const deltaRate = rnd2(nowRate) / rnd2(prevRate)
  const week = today * Math.pow(nowRate, 7)
  const thirtyDays = today * Math.pow(nowRate, 30)
</script>

<style>
  h3 {
    @apply text-3xl font-bold;
  }

  .chart-div {
    max-width: 2rem;
    overflow: hidden;
    @apply mx-2 rounded-full;
  }

  .data-div {
    flex-basis: 70%;
    @apply text-sm flex flex-col;
  }
</style>

<div class="flex flex-col">
  <div class="flex flex-row">
    <h3>{region}</h3>
    <div class="chart-div">
      <Slope {region} growing={deltaRate > 1} />
    </div>
  </div>
  <div class="flex flex-row">
    <div class="data-div">
      <h4 class="font-bold">Confirmed Cases</h4>
      <div class="data-text">Today: {today}</div>
      <div class="data-text">Yesterday: {yesterday}</div>
      <div class="data-text">Two Days Ago: {twoAgo}</div>
    </div>
    <div class="data-div">
      <h4 class="font-bold">Rate of Growth</h4>
      <div class="data-text">Today: {rnd2(nowRate)}</div>
      <div class="data-text">Yesterday: {rnd2(prevRate)}</div>
      <div class="data-text">Rate of Rate: {rnd2(deltaRate)}</div>
    </div>
  </div>
  <div class="flex flex-col">

    <div class="data-div">
      <h4 class="font-bold">Future Based on Today's Rate</h4>
      <div class="data-text">New cases in 7d: {rnd0(week) - today}</div>
      <div class="data-text">Total cases in 7d: {rnd0(week)}</div>
    </div>
  </div>
</div>
